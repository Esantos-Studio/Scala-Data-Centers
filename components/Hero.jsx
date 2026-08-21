'use client';

import { useState } from 'react';
import SplitHeading from './SplitHeading';

const SLIDES = [
  {
    bg: { type: 'video', src: '/Assets/hero-video.mp4' },
    title: 'Infraestrutura digital preparada para o futuro da IA',
    cta: 'Conheça a Scala',
  },
  {
    bg: { type: 'image', src: '/Assets/hero-slide2-v2.jpg', alt: 'Data center Scala Data Centers' },
    title: 'Relatório de Sustentabilidade',
    cta: 'Acesse o relatório 2025',
  },
  {
    bg: { type: 'image', src: '/Assets/hero-slide3-v2.jpg', alt: 'Scala AI City' },
    title: 'Uma nova geração de infraestrutura dedicada à Inteligência Artificial',
    cta: 'Conheça a Scala AI City',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  function goTo(index) {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }

  return (
    <section className="hero-section">
      <div className="hero-card">
        {SLIDES.map((slide, i) => (
          <div key={i} className={`hero-slide${i === current ? ' is-active' : ''}`} data-slide-index={i}>
            {slide.bg.type === 'video' ? (
              <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true">
                <source src={slide.bg.src} type="video/mp4" />
              </video>
            ) : (
              <img className="hero-slide-bg" src={slide.bg.src} alt={slide.bg.alt} />
            )}
            <div className="hero-ellipse hero-ellipse-1" />
            <div className="hero-ellipse hero-ellipse-2" />
            <div className="hero-overlay" />
            <div className="hero-content">
              {i === current && (
                <SplitHeading key={i} as="h1" triggerOnScroll={false}>{slide.title}</SplitHeading>
              )}
              <button className="btn-pill">
                {slide.cta}
                <span className="icon-circle"><svg fill="none"><use href="#icon-arrow-right" /></svg></span>
              </button>
            </div>
          </div>
        ))}

        <div className="hero-slider">
          <button className="chevron-btn" onClick={() => goTo(current - 1)}>
            <svg fill="none"><use href="#icon-chevron-left" /></svg>
          </button>
          <div className="hero-progress">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={i === current ? 'active' : ''}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button className="chevron-btn" onClick={() => goTo(current + 1)}>
            <svg fill="none"><use href="#icon-chevron-right" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
