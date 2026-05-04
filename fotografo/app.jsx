/* global React, ReactDOM, Nav, Hero, Categories, Featured, CastCTA, Articles, Footer, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakToggle, TweakRadio */
const { useEffect, useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "goldTone": "#C6A46C",
  "categoriesDark": true
}/*EDITMODE-END*/;

function App() {
  const { values, setTweak } = useTweaks(TWEAK_DEFAULTS);

  // Apply gold tone to CSS vars
  useEffect(() => {
    const g = values.goldTone || '#C6A46C';
    document.documentElement.style.setProperty('--gold', g);
    // Derive soft and deep variants
    document.documentElement.style.setProperty('--gold-soft', shade(g, 15));
    document.documentElement.style.setProperty('--gold-deep', shade(g, -22));
    document.documentElement.style.setProperty('--line', hexA(g, 0.35));
  }, [values.goldTone]);

  // Scroll reveal observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Categories darkMode={values.categoriesDark} />
      <Featured />
      <CastCTA />
      <Articles />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tom dourado">
          <TweakRadio
            label="Preset"
            value={values.goldTone}
            onChange={(v) => setTweak('goldTone', v)}
            options={[
              { value: '#C6A46C', label: 'Ouro' },
              { value: '#D8C8A0', label: 'Champanhe' },
              { value: '#A88445', label: 'Latão' },
            ]}
          />
          <TweakColor value={values.goldTone} onChange={(v) => setTweak('goldTone', v)} label="Personalizado" />
        </TweakSection>

        <TweakSection label="Categorias">
          <TweakToggle
            label="Modo escuro"
            value={values.categoriesDark}
            onChange={(v) => setTweak('categoriesDark', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

// Color helpers
function hexA(hex, a) {
  const c = hex.replace('#','');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return `rgba(${r},${g},${b},${a})`;
}
function shade(hex, percent) {
  const c = hex.replace('#','');
  let r = parseInt(c.substr(0,2),16);
  let g = parseInt(c.substr(2,2),16);
  let b = parseInt(c.substr(4,2),16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  r = Math.round((t - r) * p) + r;
  g = Math.round((t - g) * p) + g;
  b = Math.round((t - b) * p) + b;
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
