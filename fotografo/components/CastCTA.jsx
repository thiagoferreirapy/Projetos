/* global React */

function CastCTA() {
  const steps = [
    { n: '01', t: 'Escolha seus perfis', d: 'Navegue pelo roster e selecione os talentos que conversam com a campanha.' },
    { n: '02', t: 'Envie seu briefing', d: 'Conte sobre o projeto: marca, formato, território e janelas de produção.' },
    { n: '03', t: 'Faça o casting', d: 'Agende avaliações, recebe o pacote e fechamos os termos junto com você.' },
  ];

  return (
    <section id="cast" style={{ background: 'var(--bone)', padding: 'clamp(90px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background numeral */}
      <div aria-hidden style={{
        position: 'absolute', right: -60, top: 80,
        fontFamily: '"DM Serif Display", serif', fontStyle: 'italic',
        fontSize: 'clamp(280px, 36vw, 520px)', lineHeight: 1,
        color: 'rgba(198,164,108,0.08)', fontWeight: 400,
        pointerEvents: 'none',
      }}>03</div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 9vw, 100px)' }}>
          <div className="eyebrow" style={{ color: 'var(--gold-deep)', marginBottom: 28 }}>
            03&nbsp;<span style={{ opacity: 0.4 }}>—</span>&nbsp;Para marcas
          </div>
          <h2 style={{
            margin: 0,
            fontFamily: '"Italiana", serif',
            fontSize: 'clamp(52px, 10vw, 168px)',
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: '0.01em',
          }}>
            <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cast&nbsp;your</span>
            <span style={{
              display: 'block',
              fontFamily: '"DM Serif Display", serif',
              fontStyle: 'italic',
              color: 'var(--gold-deep)',
              letterSpacing: '-0.02em',
              marginTop: '-0.04em',
            }}>profiles.</span>
          </h2>
          <div style={{
            marginTop: 32,
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 1.6vw, 24px)',
            color: 'rgba(20,20,20,0.6)',
            maxWidth: 540,
            margin: '32px auto 0',
            lineHeight: 1.5,
          }}>
            Três passos para construir um casting com a precisão de uma maison.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          alignItems: 'stretch',
        }}>
          {steps.map((s, i) => (
            <div key={i} className="reveal" style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              padding: '40px 36px 44px',
              position: 'relative',
              transition: 'transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s ease, background .5s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.08)'; e.currentTarget.style.background = 'var(--noir)'; e.currentTarget.querySelectorAll('.flip-text').forEach(el=>el.style.color='var(--bone)'); e.currentTarget.querySelectorAll('.flip-num').forEach(el=>el.style.color='var(--gold)'); e.currentTarget.querySelectorAll('.flip-rule').forEach(el=>el.style.background='rgba(198,164,108,0.4)'); }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--paper)'; e.currentTarget.querySelectorAll('.flip-text').forEach(el=>el.style.color=''); e.currentTarget.querySelectorAll('.flip-num').forEach(el=>el.style.color=''); e.currentTarget.querySelectorAll('.flip-rule').forEach(el=>el.style.background=''); }}
            >
              <div className="flip-num" style={{
                fontFamily: '"DM Serif Display", serif',
                fontStyle: 'italic', fontSize: 72, fontWeight: 400,
                color: 'var(--gold-deep)', lineHeight: 1, marginBottom: 28,
                letterSpacing: '-0.02em',
                transition: 'color .5s ease',
              }}>{s.n}</div>

              <div className="flip-rule" style={{ height: 1, background: 'rgba(20,20,20,0.15)', marginBottom: 28, transition: 'background .5s ease' }} />

              <h3 className="flip-text" style={{
                margin: 0,
                fontFamily: '"Italiana", serif',
                fontSize: 32, fontWeight: 400, marginBottom: 16,
                letterSpacing: '0.01em', lineHeight: 1.05,
                transition: 'color .5s ease',
              }}>{s.t}</h3>
              <p className="flip-text" style={{
                margin: 0,
                fontFamily: '"Archivo", sans-serif',
                fontSize: 14, lineHeight: 1.7,
                color: 'rgba(20,20,20,0.65)', fontWeight: 350,
                letterSpacing: '0.005em',
                transition: 'color .5s ease',
              }}>{s.d}</p>

              <div className="flip-text eyebrow" style={{ marginTop: 56 }}>
                <span className="link-underline">Iniciar&nbsp;&nbsp;→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big primary button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
          <a href="#" className="eyebrow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 20,
            background: 'var(--noir)', color: 'var(--bone)',
            padding: '26px 48px',
            fontSize: 12,
            textDecoration: 'none',
            border: '1px solid var(--noir)',
            transition: 'background .4s ease, color .4s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--noir)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--noir)'; e.currentTarget.style.color = 'var(--bone)'; e.currentTarget.style.borderColor = 'var(--noir)'; }}
          >
            Solicitar casting
            <span style={{ width: 32, height: 1, background: 'currentColor' }} />
          </a>
        </div>
      </div>
    </section>
  );
}

window.CastCTA = CastCTA;
