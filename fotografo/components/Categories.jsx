/* global React */

function Categories({ darkMode }) {
  // Editorial mix: caps + italic lowercase, varied stylistic treatment per item
  const items = [
    { t: 'Modelos', style: 'caps' },
    { t: 'influencers', style: 'ital' },
    { t: 'Atletas', style: 'caps' },
    { t: 'artistas', style: 'ital' },
    { t: 'Gamers', style: 'caps' },
    { t: 'criadores', style: 'ital' },
    { t: 'Músicos', style: 'caps' },
  ];
  // Triple for seamless loop
  const loop = [...items, ...items, ...items];

  const bg = darkMode ? 'var(--noir)' : 'var(--paper)';
  const fg = darkMode ? 'var(--bone)' : 'var(--noir)';
  const accent = darkMode ? 'var(--gold)' : 'var(--gold-deep)';
  const subtle = darkMode ? 'rgba(245,242,236,0.5)' : 'rgba(20,20,20,0.55)';

  return (
    <section id="roster" style={{
      background: bg,
      color: fg,
      padding: '140px 0 120px',
      transition: 'background .6s ease, color .6s ease',
      borderTop: darkMode ? '1px solid rgba(198,164,108,0.2)' : '1px solid rgba(20,20,20,0.08)',
      borderBottom: darkMode ? '1px solid rgba(198,164,108,0.2)' : '1px solid rgba(20,20,20,0.08)',
      overflow: 'hidden',
    }}>
      {/* Eyebrow */}
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 80, flexWrap: 'wrap', gap: 16 }}>
        <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12, color: subtle }}>
          <span className="gold-dot" /> 01&nbsp;<span style={{ opacity: 0.4 }}>—</span>&nbsp;Roster
        </div>
        <div style={{
          fontFamily: '"DM Serif Display", serif',
          fontStyle: 'italic', fontSize: 22, color: subtle,
          letterSpacing: '-0.005em',
        }}>
          de modelos a gamers, <span style={{ color: accent }}>uma curadoria</span>.
        </div>
      </div>

      {/* Marquee — mixed editorial treatment */}
      <div style={{
        position: 'relative',
        whiteSpace: 'nowrap',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}>
        <div style={{
          display: 'inline-flex', gap: 72,
          animation: 'marquee 60s linear infinite',
        }}>
          {loop.map((cat, i) => {
            const isCaps = cat.style === 'caps';
            return (
              <span key={i} style={{
                fontFamily: isCaps ? '"Italiana", serif' : '"DM Serif Display", serif',
                fontStyle: isCaps ? 'normal' : 'italic',
                fontSize: 'clamp(72px, 12vw, 184px)',
                fontWeight: 400,
                letterSpacing: isCaps ? '0.03em' : '-0.015em',
                textTransform: isCaps ? 'uppercase' : 'none',
                lineHeight: 1,
                display: 'inline-flex', alignItems: 'center', gap: 48,
              }}>
                {cat.t}
                <span style={{
                  width: 8, height: 8, borderRadius: 999,
                  background: accent, display: 'inline-block',
                  transform: 'translateY(-14px)',
                }} />
              </span>
            );
          })}
        </div>
      </div>

      {/* Underline copy */}
      <div className="container" style={{
        marginTop: 100,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 24,
      }}>
        <div style={{ gridColumn: 'span 5' }}>
          <div className="eyebrow" style={{ color: accent, marginBottom: 22 }}>
            Sobre&nbsp;o&nbsp;casting
          </div>
          <div style={{
            fontFamily: '"DM Serif Display", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 3.4vw, 52px)',
            lineHeight: 1.05,
            color: accent,
            letterSpacing: '-0.01em',
          }}>
            Sete categorias,<br/>
            <span style={{ color: fg, fontFamily: '"Italiana", serif', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0.02em' }}>uma só</span> curadoria.
          </div>
        </div>
        <div style={{ gridColumn: '6 / span 7' }}>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(22px, 2vw, 30px)',
            lineHeight: 1.45,
            margin: 0,
            fontWeight: 400,
            textWrap: 'pretty',
            letterSpacing: '0.005em',
          }}>
            Trabalhamos com uma curadoria de <em style={{ color: accent, fontStyle: 'italic' }}>240+ talentos</em> em sete categorias —
            de rostos editoriais a vozes que ditam tendência. Cada perfil é selecionado com critério de longo prazo:
            <span style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic', color: accent }}> relevância cultural</span>,
            <span style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic', color: accent }}> autenticidade</span> e
            <span style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic', color: accent }}> potência criativa</span>.
          </p>
          <a href="#cast" className="link-underline eyebrow" style={{
            display: 'inline-block', marginTop: 36,
            color: fg, textDecoration: 'none',
          }}>
            Ver casting completo&nbsp;&nbsp;→
          </a>
        </div>
      </div>
    </section>
  );
}

window.Categories = Categories;
