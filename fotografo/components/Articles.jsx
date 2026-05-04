/* global React */
const { useEffect: useEffectV, useRef: useRefV, useState: useStateV } = React;

const REELS = [
  {
    n: '01',
    brand: 'Aurelia Maison',
    title: 'Aurelia — A Quiet Revolution',
    cat: 'Editorial Film · Inverno 2026',
    talent: 'Helena Vasques',
    poster: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&auto=format&fit=crop&q=85',
  },
  {
    n: '02',
    brand: 'Velocity Sport',
    title: 'Velocity — The Athlete\u2019s Code',
    cat: 'Campanha · Outono 2026',
    talent: 'Tomás Aldana',
    poster: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1800&auto=format&fit=crop&q=85',
  },
  {
    n: '03',
    brand: 'Studio Mâche',
    title: 'Mâche — Bastidores de Outono',
    cat: 'Behind the scenes',
    talent: 'Yuki Mori',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1800&auto=format&fit=crop&q=85',
  },
  {
    n: '04',
    brand: 'Riviera Mag',
    title: 'Riviera — A Nova Geração do Luxo',
    cat: 'Cover Story · Abril',
    talent: 'Inês Marçal',
    poster: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&auto=format&fit=crop&q=85',
  },
  {
    n: '05',
    brand: 'Fototo Studio',
    title: 'Fototo — Casting do Mês',
    cat: 'Editorial · Abril 2026',
    talent: 'Naomi Rocha',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1800&auto=format&fit=crop&q=85',
  },
];

// Each reel takes one "page" (100vh) of scroll progress.
// We pin a stage to the viewport via sticky and drive everything from a single scroll progress.
const PAGE = 1; // vh per reel of progress before transitioning

function Articles() {
  const sectionRef = useRefV(null);
  const [progress, setProgress] = useStateV(0); // 0..REELS.length

  useEffectV(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      // Each reel takes REEL_VH_FACTOR * vh worth of scroll progress.
      // Larger factor = more scroll needed per reel = ring fills more gradually.
      const REEL_VH_FACTOR = 1.6;
      const perReel = vh * REEL_VH_FACTOR;
      const total = REELS.length * perReel;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / perReel); // 0..REELS.length
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const activeIdx = Math.min(REELS.length - 1, Math.floor(progress));
  const localFrac = Math.max(0, Math.min(1, progress - activeIdx)); // 0..1 within current reel

  const sectionHeight = `calc(${REELS.length * 160}vh + 100vh)`; // 1.6x per reel

  const jumpTo = (i) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const top = sec.offsetTop + i * window.innerHeight * 1.6;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      id="articles"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'var(--noir)',
        height: sectionHeight,
      }}
    >
      {/* Intro header sits ABOVE the pinned stage, scrolls past normally */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        background: 'var(--noir)', color: 'var(--bone)',
        padding: '120px 0 60px', textAlign: 'center', zIndex: 2,
        borderTop: '1px solid rgba(198,164,108,0.15)',
        pointerEvents: 'none',
      }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 28 }}>
            04&nbsp;<span style={{ opacity: 0.4 }}>—</span>&nbsp;Videoclips
          </div>
          <h2 style={{
            margin: 0,
            fontFamily: '"Italiana", serif',
            fontSize: 'clamp(46px, 7.2vw, 124px)',
            fontWeight: 400, lineHeight: 0.94, letterSpacing: '0.02em',
            color: 'var(--bone)',
            textTransform: 'uppercase',
          }}>
            <span style={{
              fontFamily: '"DM Serif Display", serif', fontStyle: 'italic',
              color: 'var(--gold)', textTransform: 'none',
              letterSpacing: '-0.015em', fontSize: '1em',
            }}>stories</span>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', textTransform: 'none', fontSize: '0.62em', color: 'rgba(245,242,236,0.65)', margin: '0 0.2em' }}>em</span>
            movimento
          </h2>
        </div>
      </div>

      {/* Sticky stage — stays in viewport while user scrolls within section */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}>
        {REELS.map((r, i) => (
          <ReelLayer
            key={i}
            reel={r}
            idx={i}
            activeIdx={activeIdx}
            localFrac={localFrac}
          />
        ))}

        <ReelsPagination
          total={REELS.length}
          activeIdx={activeIdx}
          localFrac={localFrac}
          onJump={jumpTo}
        />
      </div>
    </section>
  );
}

function ReelLayer({ reel, idx, activeIdx, localFrac }) {
  // Hold the current reel for the first 65% of scroll progress (ring fills, video plays).
  // Only in the final 35% does the next reel slide in with parallax.
  const HOLD = 0.95;
  let transFrac = 0;
  if (localFrac > HOLD) {
    const t = (localFrac - HOLD) / (1 - HOLD); // 0..1
    // ease-in-out cubic for smooth parallax
    transFrac = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  let translateY = '100%';
  let opacity = 0;

  if (idx < activeIdx) {
    translateY = '-12%';
    opacity = 0;
  } else if (idx === activeIdx) {
    translateY = '0%';
    opacity = 1;
  } else if (idx === activeIdx + 1) {
    translateY = `${(1 - transFrac) * 100}%`;
    opacity = transFrac > 0.01 ? 1 : 0;
  } else {
    translateY = '100%';
    opacity = 0;
  }

  // Image internal parallax for active reel — slow upward drift
  const imgTranslate = idx === activeIdx ? `${-localFrac * 12}%` : '0%';
  const imgScale = idx === activeIdx ? 1 + localFrac * 0.04 : 1;

  return (
    <div
      data-idx={idx}
      data-screen-label={`Reel ${reel.n}`}
      style={{
        position: 'absolute', inset: 0,
        transform: `translateY(${translateY})`,
        opacity,
        transition: 'opacity .35s ease',
        willChange: 'transform, opacity',
        zIndex: idx === activeIdx ? 1 : (idx === activeIdx + 1 ? 2 : 0),
        overflow: 'hidden',
      }}
    >
      {/* Background — inner parallax drift */}
      <div style={{
        position: 'absolute', inset: '-10% 0 -10% 0',
        transform: `translateY(${imgTranslate}) scale(${imgScale})`,
        willChange: 'transform',
      }}>
        <img
          src={reel.poster}
          alt={reel.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Vignette for legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.6) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top-left meta */}
      <div className="eyebrow" style={{
        position: 'absolute', top: 110, left: 48,
        color: 'rgba(245,242,236,0.85)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--gold)' }} />
        <span>{reel.brand}</span>
        <span style={{ width: 18, height: 1, background: 'rgba(245,242,236,0.5)' }} />
        <span style={{ color: 'rgba(245,242,236,0.55)' }}>{reel.cat}</span>
      </div>

      {/* Centered title */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 48px',
      }}>
        <h3 style={{
          margin: 0,
          fontFamily: '"DM Serif Display", serif',
          fontWeight: 400, fontStyle: 'italic',
          fontSize: 'clamp(46px, 6.2vw, 104px)',
          lineHeight: 1.02, letterSpacing: '-0.02em',
          color: 'var(--bone)',
          textShadow: '0 4px 40px rgba(0,0,0,0.4)',
          maxWidth: 1180,
        }}>{reel.title}</h3>
      </div>

      {/* Bottom-left talent + play */}
      <div style={{
        position: 'absolute', bottom: 48, left: 48,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{
          width: 54, height: 54, borderRadius: 999,
          border: '1px solid rgba(245,242,236,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 1.5L12.5 7L2 12.5V1.5Z" fill="var(--bone)" />
          </svg>
        </div>
        <div>
          <div className="eyebrow" style={{ fontSize: 10, color: 'var(--gold)', marginBottom: 6 }}>
            Estrelado&nbsp;por
          </div>
          <div style={{
            fontFamily: '"Italiana", serif',
            fontSize: 24, fontWeight: 400, color: 'var(--bone)',
            letterSpacing: '0.02em',
          }}>{reel.talent}</div>
        </div>
      </div>

      {/* Bottom-right URL */}
      <div className="eyebrow" style={{
        position: 'absolute', bottom: 56, right: 96,
        fontSize: 10, letterSpacing: '0.22em',
        color: 'rgba(245,242,236,0.6)',
      }}>
        fototo.studio<span style={{ opacity: 0.5 }}>/</span>stories<span style={{ opacity: 0.5 }}>/</span>{reel.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
      </div>
    </div>
  );
}

function ReelsPagination({ total, activeIdx, localFrac, onJump }) {
  return (
    <div style={{
      position: 'absolute',
      right: 28, top: '50%', transform: 'translateY(-50%)',
      zIndex: 40,
      display: 'flex', flexDirection: 'column', gap: 2,
      padding: '14px 8px',
      borderRadius: 999,
      background: 'rgba(11,11,11,0.45)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(245,242,236,0.18)',
    }}>
      {Array.from({ length: total }).map((_, i) => {
        // Fill amount for this dot:
        //   already-passed reels → 1 (full)
        //   active reel → localFrac
        //   future reels → 0
        let fill = 0;
        if (i < activeIdx) fill = 1;
        else if (i === activeIdx) fill = localFrac;
        else fill = 0;

        return (
          <PaginationDot key={i} idx={i} fill={fill} active={i === activeIdx} onClick={() => onJump(i)} />
        );
      })}
    </div>
  );
}

function PaginationDot({ idx, fill, active, onClick }) {
  const size = 36;
  const stroke = 1.4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * (1 - fill);

  return (
    <button
      onClick={onClick}
      style={{
        width: size, height: size,
        border: 'none', background: 'transparent',
        position: 'relative',
        cursor: 'pointer',
        padding: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Track + progress ring */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r}
          stroke="rgba(245,242,236,0.18)" strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r}
          stroke="var(--gold)" strokeWidth={stroke} fill="none"
          strokeDasharray={c}
          strokeDashoffset={dash}
          style={{ transition: 'stroke-dashoffset .25s cubic-bezier(.2,.7,.2,1)' }}
          strokeLinecap="round"
        />
      </svg>
      <span style={{
        fontSize: 10, letterSpacing: '0.08em',
        fontVariantNumeric: 'tabular-nums',
        color: active ? 'var(--gold)' : 'rgba(245,242,236,0.6)',
        fontWeight: active ? 600 : 400,
        fontFamily: 'inherit',
        transition: 'color .35s ease',
      }}>
        0{idx+1}
      </span>
    </button>
  );
}

window.Articles = Articles;
