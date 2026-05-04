/* global React */
const { useEffect: useEffectF, useRef: useRefF, useState: useStateF } = React;

const TALENTS = [
  { name: 'Helena Vasques', cat: 'Modelo', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80', color: false },
  { name: 'Tomás Aldana', cat: 'Atleta', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80', color: true },
  { name: 'Yuki Mori', cat: 'Criadora', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80', color: false },
  { name: 'Renan Sá', cat: 'Gamer', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80', color: false },
  { name: 'Inês Marçal', cat: 'Influencer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80', color: true },
  { name: 'Júlia Bertoni', cat: 'Modelo', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80', color: false },
  { name: 'Caio Vinhas', cat: 'Artista', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80', color: false },
  { name: 'Naomi Rocha', cat: 'Modelo', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80', color: false },
];

function Featured() {
  const [isMobile, setIsMobile] = useStateF(false);
  useEffectF(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 760);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section style={{ background: 'var(--paper)', padding: isMobile ? '100px 0 90px' : '160px 0 140px', position: 'relative' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: isMobile ? 50 : 90 }}>
        <div className="eyebrow" style={{ color: 'var(--gold-deep)', marginBottom: 28 }}>
          02&nbsp;<span style={{ opacity: 0.4 }}>—</span>&nbsp;Em destaque
        </div>
        <h2 style={{
          margin: 0,
          fontFamily: '"Italiana", serif',
          fontSize: 'clamp(48px, 9vw, 156px)',
          fontWeight: 400,
          lineHeight: 0.92,
          letterSpacing: '0.005em',
        }}>
          <span style={{
            fontFamily: '"DM Serif Display", serif',
            fontStyle: 'italic',
            color: 'var(--gold-deep)',
            letterSpacing: '-0.015em',
            fontSize: '0.8em',
            display: 'block',
          }}>featured</span>
          <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '-0.05em' }}>profiles</span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 36, color: 'rgba(20,20,20,0.55)' }}>
          <span style={{ height: 1, width: 36, background: 'var(--gold)' }} />
          <span className="quote" style={{ fontSize: 18, color: 'var(--gold-deep)' }}>casting do mês</span>
          <span className="eyebrow" style={{ fontSize: 10, opacity: 0.6 }}>· Abril MMXXVI ·</span>
          <span style={{ height: 1, width: 36, background: 'var(--gold)' }} />
        </div>
      </div>

      {isMobile ? <MobileCarousel /> : <DesktopGrid />}

      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: isMobile ? 60 : 100 }}>
        <a href="#" className="link-underline eyebrow" style={{
          color: 'var(--noir)', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 18, textAlign: 'center',
        }}>
          <span style={{ width: 22, height: 1, background: 'var(--gold)' }} />
          Ver roster completo
          <span style={{ width: 22, height: 1, background: 'var(--gold)' }} />
        </a>
      </div>
    </section>
  );
}

function DesktopGrid() {
  return (
    <div className="container">
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: '120px', gap: 18,
      }}>
        <Card t={TALENTS[0]} style={{ gridColumn: 'span 4', gridRow: 'span 5', marginTop: 40 }} index="01" />
        <Card t={TALENTS[1]} style={{ gridColumn: 'span 4', gridRow: 'span 3' }} index="02" />
        <Card t={TALENTS[2]} style={{ gridColumn: 'span 4', gridRow: 'span 3', marginTop: 60 }} index="03" />
        <Card t={TALENTS[3]} style={{ gridColumn: 'span 4', gridRow: 'span 4' }} index="04" />
        <Card t={TALENTS[4]} style={{ gridColumn: 'span 4', gridRow: 'span 5' }} index="05" />
        <Card t={TALENTS[5]} style={{ gridColumn: 'span 3', gridRow: 'span 4', marginTop: 40 }} index="06" />
        <Card t={TALENTS[6]} style={{ gridColumn: 'span 3', gridRow: 'span 4' }} index="07" />
        <Card t={TALENTS[7]} style={{ gridColumn: 'span 6', gridRow: 'span 4', marginTop: 80 }} index="08" />
      </div>
    </div>
  );
}

function MobileCarousel() {
  const scrollerRef = useRefF(null);
  const [active, setActive] = useStateF(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActive(i);
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="no-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: 0,
          padding: '0 0 8px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {TALENTS.map((t, i) => (
          <div key={i} style={{
            flex: '0 0 100%',
            scrollSnapAlign: 'center',
            padding: '0 22px',
            boxSizing: 'border-box',
          }}>
            <a href="#" style={{
              display: 'block',
              position: 'relative',
              width: '100%',
              aspectRatio: '3 / 4',
              overflow: 'hidden',
              textDecoration: 'none', color: 'inherit',
            }}>
              <img src={t.img} alt={t.name} style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: t.color ? 'none' : 'grayscale(1) contrast(1.05)',
              }} />
              <div style={{
                position: 'absolute', inset: 8,
                border: '1px solid rgba(245,242,236,0.22)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                padding: '24px 22px',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0) 100%)',
                color: 'var(--bone)',
              }}>
                <div className="eyebrow" style={{ fontSize: 10, color: 'var(--gold-soft)', marginBottom: 8 }}>
                  {t.cat}
                </div>
                <div style={{
                  fontFamily: '"Italiana", serif',
                  fontSize: 26, fontWeight: 400,
                  letterSpacing: '0.02em',
                }}>{t.name}</div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 22 }}>
        {TALENTS.map((_, i) => (
          <span key={i} style={{
            width: i === active ? 22 : 6,
            height: 6, borderRadius: 999,
            background: i === active ? 'var(--gold-deep)' : 'rgba(20,20,20,0.2)',
            transition: 'width .35s ease, background .35s ease',
          }} />
        ))}
      </div>

      <div className="eyebrow" style={{
        textAlign: 'center', marginTop: 16,
        fontSize: 10, color: 'rgba(20,20,20,0.45)',
      }}>
        ←&nbsp;arraste para navegar&nbsp;→
      </div>
    </div>
  );
}

function Card({ t, style, index }) {
  return (
    <a className="hover-zoom reveal" href="#" style={{
      ...style,
      position: 'relative', overflow: 'hidden',
      textDecoration: 'none', color: 'inherit', display: 'block',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img src={t.img} alt={t.name} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: t.color ? 'none' : 'grayscale(1) contrast(1.05)',
        }} />
      </div>
      <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(245,242,236,0.18)', pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', top: 14, left: 18,
        fontFamily: '"DM Serif Display", serif',
        fontSize: 13, letterSpacing: '0.05em',
        color: 'var(--bone)', fontStyle: 'italic', mixBlendMode: 'difference',
      }}>N°&nbsp;{index}</div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '20px 22px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
        color: 'var(--bone)',
      }}>
        <div className="eyebrow" style={{ fontSize: 10, color: 'var(--gold-soft)', marginBottom: 8 }}>
          {t.cat}
        </div>
        <div style={{
          fontFamily: '"Italiana", serif',
          fontSize: 26, fontWeight: 400, letterSpacing: '0.02em',
        }}>{t.name}</div>
      </div>
    </a>
  );
}

window.Featured = Featured;
