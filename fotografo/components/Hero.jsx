/* global React */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

// Smooth easing
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// Map progress p (0..1) into [a..b] segment, returns 0..1 within that band
const band = (p, a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));

function Hero() {
  const [isMobile, setIsMobile] = useStateH(false);
  const [progress, setProgress] = useStateH(0); // 0..1 across the whole section
  const sectionRef = useRefH(null);
  const videoRef = useRefH(null);
  const rafRef = useRefH(null);
  const scrollVelRef = useRefH(0);        // progress/s — velocidade atual do scroll
  const prevProgressRef = useRefH(0);
  const prevScrollTimeRef = useRefH(0);

  useEffectH(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 760);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Scroll → progress + velocidade
  useEffectH(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;

      const now = performance.now();
      const dt = now - prevScrollTimeRef.current;
      if (dt > 0 && dt < 150) {
        scrollVelRef.current = (p - prevProgressRef.current) / dt * 1000; // progress/s
      }
      prevProgressRef.current = p;
      prevScrollTimeRef.current = now;

      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const progressRef = useRefH(0);
  useEffectH(() => { progressRef.current = progress; }, [progress]);

  useEffectH(() => {
    const v = videoRef.current;
    if (!v) return;

    let duration = 0;
    const onMeta = () => {
      if (v.duration && isFinite(v.duration)) duration = v.duration;
    };
    if (v.readyState >= 1 && v.duration && isFinite(v.duration)) duration = v.duration;
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('durationchange', onMeta);

    const tick = () => {
      if (duration > 0) {
        const now = performance.now();
        const elapsed = now - prevScrollTimeRef.current;

        // Velocidade decai a zero em ~250ms após o scroll parar
        const vel = scrollVelRef.current * Math.max(0, 1 - elapsed / 250);

        const target = Math.min(duration - 0.05, Math.max(0, progressRef.current * duration));
        const diff = target - v.currentTime;

        if (vel > 0.002 && diff > 0) {
          // Scroll para frente: tocar na velocidade proporcional ao scroll
          // vel (progress/s) * duration (s) = taxa de reprodução ideal
          const rate = Math.min(2, Math.max(0.2, vel * duration));
          if (Math.abs(v.playbackRate - rate) > 0.05) v.playbackRate = rate;
          if (v.paused) v.play().catch(() => {});
        } else if (diff < -0.12) {
          // Scroll para trás: seek direto (inevitável na direção reversa)
          v.pause();
          try { v.currentTime = target; } catch (e) {}
        } else {
          // Parado ou alcançou o alvo
          if (!v.paused) v.pause();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    v.pause();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('durationchange', onMeta);
    };
  }, []);

  const padX = isMobile ? 22 : 48;
  const ringSize = isMobile ? 540 : 980;
  const outerRingSize = isMobile ? 620 : 1100;

  // Reveal bands — SEQUENTIAL, no stacking.
  // Each line fades IN, then OUT before the next arrives.
  // 0.00 - 0.10  : intro / topbar
  // 0.06 - 0.22  : line 1 IN  → 0.22 - 0.32 : line 1 OUT
  // 0.30 - 0.46  : line 2 IN  → 0.46 - 0.56 : line 2 OUT
  // 0.54 - 0.66  : subhead IN → 0.66 - 0.74 : subhead OUT
  // 0.74 - 0.88  : FOTOTO wordmark IN
  // 0.86 - 0.98  : stats slide in
  const introOp  = 1 - band(progress, 0.10, 0.20);

  const line1Op  = easeOut(band(progress, 0.06, 0.22)) * (1 - easeInOut(band(progress, 0.22, 0.32)));
  const line1Y   = (1 - easeOut(band(progress, 0.06, 0.22))) * 40
                 - easeInOut(band(progress, 0.22, 0.32)) * 30;

  const line2Op  = easeOut(band(progress, 0.30, 0.46)) * (1 - easeInOut(band(progress, 0.46, 0.56)));
  const line2Y   = (1 - easeOut(band(progress, 0.30, 0.46))) * 50
                 - easeInOut(band(progress, 0.46, 0.56)) * 30;

  const subOp    = easeOut(band(progress, 0.54, 0.66)) * (1 - easeInOut(band(progress, 0.66, 0.74)));
  const subY     = (1 - easeOut(band(progress, 0.54, 0.66))) * 30
                 - easeInOut(band(progress, 0.66, 0.74)) * 20;

  const wmOp     = easeOut(band(progress, 0.74, 0.88));
  const wmScale  = 0.94 + 0.06 * easeOut(band(progress, 0.74, 0.92));

  const statsOp  = easeOut(band(progress, 0.86, 0.98));
  const statsY   = (1 - band(progress, 0.86, 0.98)) * 30;

  // Video tint: stronger vignette early, lighter mid, stronger again at end
  const overlayOp = 0.55 + 0.25 * Math.abs(progress - 0.5) * 1.2;

  // Section taller → each scroll pixel covers less video time → smoother scrub
  const sectionHeight = isMobile ? '420vh' : '500vh';

  return (
    <section
      id="top"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'var(--noir)',
        color: 'var(--bone)',
        height: sectionHeight,
      }}
    >
      {/* Sticky stage — stays in viewport while user scrolls within section */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}>
        {/* Scroll-scrubbed video */}
        <video
          ref={videoRef}
          src="assets/hero.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            filter: 'grayscale(0.25) contrast(1.05) brightness(0.85)',
          }}
        />

        {/* Vignette + tint overlay */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: `radial-gradient(ellipse at center, rgba(11,11,11,${overlayOp * 0.55}) 0%, rgba(11,11,11,${overlayOp}) 100%)`,
          transition: 'background .2s linear',
        }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0) 18%, rgba(11,11,11,0) 65%, rgba(11,11,11,0.55) 100%)',
        }} />

        {/* Top meta bar */}
        {!isMobile && (
          <div style={{
            position: 'absolute', top: 110, left: 0, right: 0, zIndex: 4,
            display: 'flex', justifyContent: 'space-between',
            padding: `0 ${padX}px`,
            color: 'rgba(245,242,236,0.55)',
            opacity: introOp,
            transition: 'opacity .25s linear',
          }}>
            <span className="eyebrow">Est.&nbsp;MMXII <span style={{ opacity: 0.4, margin: '0 10px' }}>·</span> SP <span style={{ opacity: 0.4 }}>—</span> LX <span style={{ opacity: 0.4 }}>—</span> MI</span>
            <span className="eyebrow">Vol.&nbsp;IV <span style={{ opacity: 0.4, margin: '0 10px' }}>·</span> Cultura, <em style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', textTransform: 'none', letterSpacing: 0, fontSize: 13 }}>influência</em>, Legado</span>
          </div>
        )}

        {/* Decorative concentric circles — subtle parallax inward */}
        <div aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * easeOut(band(progress, 0, 0.6))})`,
          opacity: 0.5 + 0.5 * easeOut(band(progress, 0.1, 0.5)),
          pointerEvents: 'none', zIndex: 2,
        }}>
          <svg width={ringSize} height={ringSize} viewBox="0 0 980 980" fill="none">
            <circle cx="490" cy="490" r="488" stroke="rgba(198,164,108,0.20)" strokeWidth="1"/>
            <circle cx="490" cy="490" r="400" stroke="rgba(198,164,108,0.24)" strokeWidth="1"/>
            <circle cx="490" cy="490" r="320" stroke="rgba(198,164,108,0.32)" strokeWidth="1"/>
            <circle cx="490" cy="490" r="240" stroke="rgba(198,164,108,0.20)" strokeWidth="1" strokeDasharray="2 6"/>
          </svg>
        </div>

        <div aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%',
          width: outerRingSize, height: outerRingSize,
          transform: `translate(-50%, -50%) rotate(${progress * 30}deg)`,
          animation: 'spin-slow 80s linear infinite',
          pointerEvents: 'none', opacity: 0.55, zIndex: 2,
        }}>
          <svg viewBox="0 0 1100 1100" width="100%" height="100%">
            <defs>
              <path id="ringPathHero" d="M 550,550 m -520,0 a 520,520 0 1,1 1040,0 a 520,520 0 1,1 -1040,0" />
            </defs>
            <text fill="rgba(198,164,108,0.65)" style={{ fontFamily: '"DM Serif Display", serif', fontSize: 20, letterSpacing: '0.5em', fontStyle: 'italic' }}>
              <textPath href="#ringPathHero">
                Fototo · talent · culture · influence · legacy · Fototo · talent · culture · influence · legacy ·
              </textPath>
            </text>
          </svg>
        </div>

        {/* ACT 1: "Elevamos vozes" — own centered layer */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', pointerEvents: 'none',
          padding: `0 ${padX}px`,
          opacity: line1Op,
          transform: `translateY(${line1Y}px)`,
          willChange: 'opacity, transform',
        }}>
          <h1 style={{
            margin: 0, maxWidth: 1180,
            fontFamily: '"Italiana", serif',
            fontWeight: 400,
            fontSize: 'clamp(48px, 9.6vw, 156px)',
            lineHeight: 0.98,
            letterSpacing: '0.04em',
            color: 'var(--bone)',
            textShadow: '0 4px 50px rgba(0,0,0,0.5)',
          }}>Elevamos vozes</h1>
        </div>

        {/* ACT 2: "que moldam a cultura" — own centered layer */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', pointerEvents: 'none',
          padding: `0 ${padX}px`,
          opacity: line2Op,
          transform: `translateY(${line2Y}px)`,
          willChange: 'opacity, transform',
        }}>
          <h2 style={{
            margin: 0, maxWidth: 1180,
            fontFamily: '"Italiana", serif',
            fontWeight: 400,
            fontSize: 'clamp(44px, 9vw, 144px)',
            lineHeight: 0.98,
            letterSpacing: '0.005em',
            color: 'var(--bone)',
            textShadow: '0 4px 50px rgba(0,0,0,0.5)',
          }}>
            que{' '}
            <em className="ital-soft" style={{
              color: 'var(--gold)',
              letterSpacing: '-0.01em',
              fontSize: '0.95em',
              padding: '0 0.05em',
            }}>moldam</em>
            {' '}a cultura
          </h2>
        </div>

        {/* ACT 3: subhead — own centered layer */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', pointerEvents: 'none',
          padding: `0 ${padX}px`,
          opacity: subOp,
          transform: `translateY(${subY}px)`,
          willChange: 'opacity, transform',
        }}>
          <p style={{
            margin: 0,
            fontFamily: '"Archivo", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            letterSpacing: '0.02em',
            lineHeight: 1.55,
            color: 'rgba(245,242,236,0.92)',
            maxWidth: '40ch',
            textShadow: '0 2px 30px rgba(0,0,0,0.6)',
          }}>
            Construímos influência, impacto e um <span className="quote" style={{ color: 'var(--gold)', fontSize: '1.25em' }}>legado</span> que atravessa gerações.
          </p>
        </div>

        {/* ACT 3: FOTOTO wordmark — appears later, replaces headline visually */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', pointerEvents: 'none',
          padding: `0 ${padX}px`,
          opacity: wmOp,
          transform: `scale(${wmScale})`,
          transition: 'opacity .15s linear, transform .15s linear',
        }}>
          <div>
            <div style={{
              fontFamily: '"Italiana", serif',
              color: 'var(--gold)',
              fontSize: 'clamp(64px, 15vw, 240px)',
              letterSpacing: '0.04em', fontWeight: 400, lineHeight: 1,
              textShadow: '0 6px 60px rgba(0,0,0,0.6)',
            }}>
              Foto<em style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic', letterSpacing: '-0.01em' }}>to</em>
            </div>
            <div className="eyebrow" style={{
              marginTop: 18, fontSize: isMobile ? 9 : 11,
              color: 'rgba(245,242,236,0.7)',
            }}>
              Talent&nbsp;<span style={{ opacity: 0.45, margin: '0 6px' }}>—</span>&nbsp;Management&nbsp;<span style={{ opacity: 0.45, margin: '0 6px' }}>—</span>&nbsp;<span className="quote" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 14, color: 'var(--gold)' }}>Maison</span>
            </div>
          </div>
        </div>

        {/* Scroll cue (top-of-section) */}
        <div className="eyebrow" style={{
          position: 'absolute', left: padX, bottom: isMobile ? 28 : 40, zIndex: 7,
          fontSize: 10, color: 'rgba(245,242,236,0.6)',
          opacity: introOp,
          transition: 'opacity .25s linear',
        }}>
          ↓&nbsp;&nbsp;Role para descobrir
        </div>

        {/* Stats — appear in final act */}
        <div style={{
          position: 'absolute', right: padX, bottom: isMobile ? 28 : 40, zIndex: 7,
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'row',
          gap: isMobile ? 24 : 64,
          alignItems: 'flex-end',
          opacity: statsOp,
          transform: `translateY(${statsY}px)`,
          transition: 'opacity .15s linear, transform .15s linear',
        }}>
          <Stat n="240" suffix="+" l="Talentos" />
          <Stat n="78" suffix="M" l="Alcance" />
          <Stat n="120" suffix="+" l="Marcas" />
        </div>

        {/* Progress indicator (subtle, left edge) */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, height: '100%', width: 1,
          background: 'rgba(198,164,108,0.12)', zIndex: 3,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%',
            height: `${progress * 100}%`,
            background: 'var(--gold)',
            transition: 'height .12s linear',
          }} />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, suffix, l }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: '"Italiana", serif',
        fontSize: 38, color: 'var(--gold)', fontWeight: 400, lineHeight: 1,
        letterSpacing: '0.02em',
      }}>
        {n}<em style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic', fontSize: '0.7em', marginLeft: 2 }}>{suffix}</em>
      </div>
      <div className="eyebrow" style={{ fontSize: 9, color: 'rgba(245,242,236,0.6)', marginTop: 8 }}>{l}</div>
    </div>
  );
}

window.Hero = Hero;
