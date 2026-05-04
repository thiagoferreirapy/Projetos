/* global React */
const { useState, useEffect } = React;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth <= 760);
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const pad = isMobile ? (scrolled ? '12px 20px' : '16px 20px') : (scrolled ? '14px 48px' : '22px 48px');

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    padding: pad,
    transition: 'padding .5s ease, background .5s ease, backdrop-filter .5s ease, border-color .5s ease',
    background: scrolled || open ? 'rgba(11,11,11,0.85)' : 'transparent',
    backdropFilter: scrolled || open ? 'blur(14px) saturate(140%)' : 'none',
    WebkitBackdropFilter: scrolled || open ? 'blur(14px) saturate(140%)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(198,164,108,0.18)' : '1px solid transparent',
    color: '#F5F2EC',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  };

  const linkStyle = {
    color: 'inherit', textDecoration: 'none',
    fontFamily: '"Archivo", sans-serif',
    fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500,
  };

  if (isMobile) {
    return (
      <React.Fragment>
        <nav style={navStyle}>
          <a href="#top" style={{ textDecoration: 'none', color: 'var(--gold)' }}>
            <span style={{ fontFamily: '"Italiana", serif', fontSize: 22, letterSpacing: '0.08em', fontWeight: 400 }}>
              Foto<em style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic' }}>to</em>
            </span>
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Menu" style={{
            background: 'transparent', border: '1px solid rgba(198,164,108,0.5)', color: 'var(--gold)',
            padding: '8px 14px', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            borderRadius: 999, fontFamily: '"Archivo", sans-serif', fontWeight: 500, cursor: 'pointer',
          }}>{open ? 'Fechar' : 'Menu'}</button>
        </nav>
        {open && (
          <div onClick={() => setOpen(false)} style={{
            position: 'fixed', top: 56, left: 0, right: 0, bottom: 0, zIndex: 49,
            background: 'rgba(11,11,11,0.96)', backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', padding: '40px 24px',
            gap: 28, color: 'var(--bone)',
          }}>
            <a href="#roster" style={{ ...linkStyle, fontSize: 32, letterSpacing: '0.01em', textTransform: 'none', fontFamily: '"Italiana", serif', fontWeight: 400 }}>Talentos</a>
            <a href="#articles" style={{ ...linkStyle, fontSize: 32, letterSpacing: '0.01em', textTransform: 'none', fontFamily: '"DM Serif Display", serif', fontStyle: 'italic', fontWeight: 400 }}>editorial</a>
            <a href="#cast" style={{ ...linkStyle, fontSize: 32, letterSpacing: '0.01em', textTransform: 'none', fontFamily: '"Italiana", serif', fontWeight: 400 }}>Marcas</a>
            <div style={{ height: 1, background: 'rgba(198,164,108,0.2)', margin: '12px 0' }} />
            <a href="#cast" style={{ ...linkStyle, color: 'var(--gold)' }}>Contato</a>
            <a href="#" style={{ ...linkStyle, color: 'rgba(245,242,236,0.6)' }}>PT / EN</a>
          </div>
        )}
      </React.Fragment>
    );
  }

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        <a href="#roster" className="link-underline" style={linkStyle}>Talentos</a>
        <a href="#articles" className="link-underline" style={linkStyle}>Editorial</a>
        <a href="#cast" className="link-underline" style={linkStyle}>Marcas</a>
      </div>
      <a href="#top" style={{ textDecoration: 'none', color: 'var(--gold)' }}>
        <span style={{ fontFamily: '"Italiana", serif', fontSize: 26, letterSpacing: '0.08em', fontWeight: 400 }}>
          Foto<em style={{ fontFamily: '"DM Serif Display", serif', fontStyle: 'italic' }}>to</em>
        </span>
      </a>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <a href="#" className="link-underline" style={linkStyle}>PT / EN</a>
        <a href="#cast" style={{
          ...linkStyle,
          border: '1px solid rgba(198,164,108,0.55)', color: 'var(--gold)',
          padding: '10px 18px', borderRadius: 999,
          transition: 'background .4s ease, color .4s ease',
        }}
        onMouseEnter={(e)=>{e.currentTarget.style.background='var(--gold)';e.currentTarget.style.color='#0B0B0B';}}
        onMouseLeave={(e)=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--gold)';}}>
          Contato
        </a>
      </div>
    </nav>
  );
}

window.Nav = Nav;
