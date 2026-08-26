'use client';

import { useEffect, useRef, useState } from 'react';
import RevealFade from './RevealFade';
import FadeAfterTitle from './FadeAfterTitle';
import SplitHeading from './SplitHeading';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CARDS = [
  {
    size: 'large',
    bg: '/Assets/2025_Palo-Alto_Liberacao-de-Credito-do-BNDES-2-1024x576.jpg',
    badge: 'Investimentos',
    title: 'BNDES aprova R$ 180 milhões para Scala investir em equipamentos para data centers',
    date: '20 Jan 2025',
  },
  {
    size: 'small',
    bg: '/Assets/2025_DCD-Studio_A-revolucao-dos-data-centers-na-era-da-inteligencia-artificial-1024x576.jpg',
    badge: 'Data Centers',
    title: 'DCD>Studio: A revolução dos data centers na era da inteligência artificial',
    date: '20 Jan 2025',
  },
  {
    size: 'small',
    bg: '/Assets/BNAmericas-1.jpg',
    badge: 'Scala na Mídia',
    title: 'Scala é destaque no portfólio da DigitalBridge em 2024',
    date: '20 Jan 2025',
  },
  {
    size: 'small',
    bg: '/Assets/2024_-Ass.-Prot.-Intencoes-POA-45-1-1024x682.jpg',
    badge: 'Tecnologia',
    title: 'Governo assina lei que cria o primeiro polo de tecnologia de data centers do país na quarta-feira (18)',
    date: '20 Jan 2025',
  },
];

function BlogCard({ card, cardRef }) {
  return (
    <div ref={cardRef} className={`blog-card blog-card-${card.size}`}>
      <div className="blog-card-bg" style={{ backgroundImage: `url('${card.bg}')` }} />
      <div className="blog-card-content">
        <span className="blog-badge">{card.badge}</span>
        <p className="blog-title">{card.title}</p>
        <div className="blog-card-more">
          <p className="blog-card-date">{card.date}</p>
          <a className="blog-card-readmore" href="#">Ler artigo <svg fill="none"><use href="#icon-arrow-right" /></svg></a>
        </div>
      </div>
    </div>
  );
}

// Cards cascade in (fade + rise, staggered) as the grid scrolls into view.
function useBlogCardsReveal(cardRefs) {
  useEffect(() => {
    const cards = cardRefs.map((r) => r.current).filter(Boolean);
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 40 });
    const trigger = ScrollTrigger.batch(cards, {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12, overwrite: true }),
    });

    return () => {
      const triggers = Array.isArray(trigger) ? trigger : [trigger];
      triggers.forEach((t) => t?.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function Blog() {
  const [titleDone, setTitleDone] = useState(false);
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useBlogCardsReveal(cardRefs);

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-header">
          <div className="blog-header-text">
            <RevealFade as="div" className="eyebrow">
              <img src="/Assets/pontos-eybrow.svg" alt="" />
              <span>Notícias e Mídia</span>
            </RevealFade>
            <SplitHeading as="h2" onComplete={() => setTitleDone(true)}>Notícias e Insights</SplitHeading>
            <FadeAfterTitle as="p" className="paragraph-l" visible={titleDone}>
              Acompanhe notícias, estudos, reconhecimentos e movimentos estratégicos que refletem a atuação da Scala no avanço da infraestrutura digital da América Latina.
            </FadeAfterTitle>
          </div>
          <button className="btn-pill">Ver todos os artigos <span className="icon-circle"><svg fill="none"><use href="#icon-arrow-right" /></svg></span></button>
        </div>
        <div className="blog-cards-grid">
          <BlogCard card={CARDS[0]} cardRef={cardRefs[0]} />
          <div className="blog-cards-small-col">
            <div className="blog-cards-small-row">
              <BlogCard card={CARDS[1]} cardRef={cardRefs[1]} />
              <BlogCard card={CARDS[2]} cardRef={cardRefs[2]} />
            </div>
            <BlogCard card={CARDS[3]} cardRef={cardRefs[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
