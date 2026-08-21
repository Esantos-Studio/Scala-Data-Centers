import RevealFade from './RevealFade';
import SplitHeading from './SplitHeading';

export default function CtaBanner() {
  return (
    <section className="cta-banner-section">
      <div className="cta-banner-card">
        <div className="container">
          <RevealFade as="div" className="cta-banner-content">
            <div className="eyebrow"><img src="/Assets/pontos-eybrow.svg" alt="" /><span>Nossa trajetória</span></div>
            <SplitHeading as="h2">Há 6 anos, habilitando o futuro</SplitHeading>
            <p className="paragraph-l">Com comprometimento e excelência, consolidamos uma plataforma de infraestrutura digital preparada para apoiar a evolução da inteligência artificial, da nuvem e da economia digital na América Latina.</p>
            <button className="btn-pill">Sobre a Scala <span className="icon-circle"><svg fill="none"><use href="#icon-arrow-right" /></svg></span></button>
          </RevealFade>
        </div>
      </div>
    </section>
  );
}
