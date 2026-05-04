/* global React */
const { useState: useStateF, useEffect: useEffectF } = React;

function Footer() {
  const [email, setEmail] = useStateF('');
  const [done, setDone] = useStateF(false);
  const [isMobile, setIsMobile] = useStateF(false);

  useEffectF(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 760);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const cols = [
    { h: 'Agência', items: ['Sobre', 'Time', 'Imprensa', 'Carreiras'] },
    { h: 'Talentos', items: ['Modelos', 'Influencers', 'Atletas', 'Artistas', 'Gamers'] },
    { h: 'Marcas', items: ['Casting', 'Briefing', 'Cases', 'Contato comercial'] },
    { h: 'Editorial', items: ['Latest', 'Arquivo', 'Newsletter'] },
  ];

  const padX = isMobile ? 22 : 48;

  return (
    <footer style={{ background: 'var(--noir)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
      {/* Newsletter */}
      <div style={{ borderBottom: '1px solid rgba(198,164,108,0.18)' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 30 : 60,
          padding: `${isMobile ? 60 : 90}px ${padX}px`,
          alignItems: 'center',
        }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 22 }}>
              Newsletter&nbsp;mensal
            </div>
            <h3 style={{
              margin: 0,
              fontFamily: '"Italiana", serif',
              fontSize: 'clamp(28px, 3.4vw, 52px)', fontWeight: 400,
              lineHeight: 1.08, letterSpacing: '0.005em',
              textTransform: 'none',
            }}>
              <em style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic', color: 'var(--gold)', letterSpacing: '-0.015em' }}>Receba</em> os bastidores de casting,<br/>editoriais e novos talentos.
            </h3>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{
            display: 'flex', borderBottom: '1px solid rgba(245,242,236,0.4)',
            alignItems: 'center', paddingBottom: 14,
          }}>
            <input
              type="email" required placeholder="seu@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--bone)', fontFamily: 'inherit', fontSize: 16, padding: '8px 0',
                fontWeight: 300,
              }}
            />
            <button type="submit" className="eyebrow" style={{
              background: 'transparent', border: 'none', color: 'var(--gold)',
              cursor: 'pointer', padding: '8px 0', whiteSpace: 'nowrap',
              fontSize: 11,
            }}>
              {done ? '✓\u00A0Inscrito' : 'Inscrever\u00A0\u00A0→'}
            </button>
          </form>
        </div>
      </div>

      {/* Big logo */}
      <div className="container" style={{ padding: `${isMobile ? 60 : 90}px ${padX}px ${isMobile ? 30 : 50}px`, textAlign: 'center', position: 'relative' }}>
        <div style={{
          fontFamily: '"Italiana", serif',
          color: 'var(--gold)', fontSize: 'clamp(64px, 20vw, 360px)',
          fontWeight: 400, lineHeight: 0.85, letterSpacing: '0.04em',
          maxWidth: '100%', wordBreak: 'break-word', overflow: 'hidden',
        }}>
          Foto<em style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic', letterSpacing: '-0.02em' }}>to</em>
        </div>
        <div className="eyebrow" style={{
          marginTop: 18, color: 'rgba(245,242,236,0.5)',
        }}>
          Talent&nbsp;Management&nbsp;<span className="quote" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 14, color: 'var(--gold)', margin: '0 6px' }}>Maison</span>&nbsp;<span style={{ opacity: 0.5 }}>·</span>&nbsp;Est.&nbsp;MMXII
        </div>
      </div>

      {/* Columns */}
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : '1.3fr repeat(4, 1fr)',
        gap: isMobile ? 28 : 40,
        padding: `${isMobile ? 50 : 70}px ${padX}px ${isMobile ? 40 : 60}px`,
        borderTop: '1px solid rgba(198,164,108,0.18)',
      }}>
        <div style={{ gridColumn: isMobile ? 'span 2' : 'auto' }}>
          <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 22 }}>
            Sedes
          </div>
          <div style={{
            fontFamily: '"DM Serif Display", serif', fontStyle: 'italic',
            fontSize: 22, fontWeight: 400, lineHeight: 1.4,
            color: 'rgba(245,242,236,0.9)', letterSpacing: '-0.005em',
          }}>
            São Paulo&nbsp;<span style={{ opacity: 0.5, color: 'var(--gold)' }}>·</span>&nbsp;Lisboa&nbsp;<span style={{ opacity: 0.5, color: 'var(--gold)' }}>·</span>&nbsp;Milano
          </div>
          <div style={{
            marginTop: 24,
            fontFamily: '"Archivo", sans-serif',
            fontSize: 13, lineHeight: 1.8, color: 'rgba(245,242,236,0.6)',
            letterSpacing: '0.01em',
          }}>
            cast@fototo.studio<br/>
            +55&nbsp;11&nbsp;4000&nbsp;0000
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.h}>
            <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 22 }}>
              {c.h}
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {c.items.map((it) => (
                <li key={it}>
                  <a href="#" className="link-underline" style={{
                    color: 'rgba(245,242,236,0.82)', textDecoration: 'none',
                    fontFamily: '"Archivo", sans-serif',
                    fontSize: 14, fontWeight: 350, letterSpacing: '0.005em',
                  }}>{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="container eyebrow" style={{
        padding: `${isMobile ? 22 : 30}px ${padX}px ${isMobile ? 28 : 36}px`,
        borderTop: '1px solid rgba(198,164,108,0.18)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 18 : 0,
        fontSize: 10,
        color: 'rgba(245,242,236,0.5)',
        textAlign: 'center',
      }}>
        <span>©&nbsp;MMXXVI&nbsp;<span className="quote" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 13, color: 'var(--gold)', margin: '0 4px' }}>Fototo</span>&nbsp;Maison</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 1.5L13.8 10.2L22.5 12L13.8 13.8L12 22.5L10.2 13.8L1.5 12L10.2 10.2L12 1.5Z" stroke="var(--gold)" strokeWidth="0.8" />
        </svg>
        <div style={{ display: 'flex', gap: isMobile ? 16 : 22, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#" className="link-underline" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
          <a href="#" className="link-underline" style={{ color: 'inherit', textDecoration: 'none' }}>TikTok</a>
          <a href="#" className="link-underline" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
          <a href="#" className="link-underline" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
