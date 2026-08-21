'use client';

import { useRef } from 'react';
import RevealFade from './RevealFade';
import SplitHeading from './SplitHeading';
import useParallax from '@/hooks/useParallax';

const CARDS = [
  {
    title: 'Colocation e Conectividade',
    text: 'Oferecemos modelos de implantação e operação que vão de Full Colocation a Build-to-Suit e Triple Net Lease, adaptando a infraestrutura às necessidades de cada cliente.',
  },
  {
    title: 'Estabilidade, Qualidade, Disponibilidade e Segurança',
    text: 'Com energia 100% limpa e renovável, infraestrutura própria e arquitetura de alta densidade, nossos data centers apoiam cargas de trabalho críticas com estabilidade, segurança e capacidade para crescer no longo prazo.',
  },
];

export default function Solutions() {
  const bgPirulaRef = useRef(null);
  const greenRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useParallax(bgPirulaRef, 0.22);
  useParallax(greenRef, -0.45);
  useParallax(leftRef, -0.35);
  useParallax(rightRef, -0.55);

  return (
    <section className="section solutions-section">
      <img ref={bgPirulaRef} className="bg-pirula bg-pirula-solutions" src="/Assets/pirulas-bkg-01.svg" alt="" />
      <div className="container">
        <div className="solutions-illustration">
          <img ref={greenRef} className="pirula pirula-green" src="/Assets/Rectangle 207.svg" alt="" />
          <RevealFade as="div" className="photo-frame">
            <img src="/Assets/solucoes-img-01.png" alt="Data center Scala Data Centers" />
          </RevealFade>
          <img ref={leftRef} className="pirula pirula-left" src="/Assets/pirulas-left-solucoes.svg" alt="" />
          <img ref={rightRef} className="pirula pirula-right" src="/Assets/pirulas-direita-solucoes.svg" alt="" />
        </div>
        <div className="solutions-content">
          <div className="solutions-heading-block">
            <RevealFade as="div" className="eyebrow">
              <img src="/Assets/pontos-eybrow.svg" alt="" />
              <span>Soluções</span>
            </RevealFade>
            <SplitHeading as="h2">
              <span>Soluções escaláveis</span> para operações críticas
            </SplitHeading>
          </div>
          <div className="solutions-body">
            <div className="cards-solutions">
              {CARDS.map((card, i) => (
                <div key={card.title}>
                  <RevealFade as="div" className="solution-card">
                    <div className="solution-card-text">
                      <h4>{card.title}</h4>
                      <p>{card.text}</p>
                    </div>
                    <button className="btn-arrow-small"><svg fill="none"><use href="#icon-arrow-right" /></svg></button>
                  </RevealFade>
                  {i === 0 && <hr className="solutions-divider" />}
                </div>
              ))}
            </div>
            <button className="btn-pill">
              Ver todas as soluções
              <span className="icon-circle"><svg fill="none"><use href="#icon-arrow-right" /></svg></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
