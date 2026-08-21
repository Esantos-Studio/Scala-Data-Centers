'use client';

import { useEffect, useRef, useState } from 'react';
import FadeAfterTitle from './FadeAfterTitle';
import SplitHeading from './SplitHeading';
import useParallax from '@/hooks/useParallax';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const TABS = [
  {
    key: 'inovacao',
    eyebrow: 'Inovação',
    heading: <><span>Inteligência aplicada</span> em cada camada</>,
    text: 'Do design à operação, combinamos engenharia, tecnologia e excelência operacional para transformar inovação em infraestrutura de alto desempenho. O resultado é uma plataforma mais eficiente, estável, e capaz de acelerar entregas com previsibilidade.',
    cta: 'Projetos em destaque',
    img: '/Assets/imagem-inovacao-01.png',
    imgAlt: 'Equipe Scala Data Centers monitorando operações',
  },
  {
    key: 'sustentabilidade',
    eyebrow: 'Sustentabilidade',
    heading: <>Sustentabilidade como <span>princípio</span></>,
    text: 'A sustentabilidade faz parte da forma como planejamos, construímos e operamos nossa infraestrutura. Guiados por ambição climática, metas estruturadas e resultados concretos, promovemos o uso eficiente de recursos, responsabilidade social e uma governança sólida para gerar valor de longo prazo para clientes, comunidades e sociedade.',
    cta: 'Ver Programa ESG',
    img: '/Assets/imagem-sustentabilidade-01.jpg',
    imgAlt: 'Colaboradora Scala Data Centers em obra',
  },
];

// Vertical scroll-driven tabs: the illustration pins in place while the tab
// list scrolls past; whichever tab crosses the center of the viewport
// becomes active, expanding its body and crossfading the pinned image, and
// swapping the two accent pirulas toward/away from each other.
function useFeatureTabsScroll({ listRef, visualRef, illustrationRef, tabRefs, pirulaLeftRef, pirulaRightRef, setActiveKey }) {
  useEffect(() => {
    const list = listRef.current;
    const visual = visualRef.current;
    const illustration = illustrationRef.current;
    if (!list || !visual) return;

    const tabs = tabRefs.map((r) => r.current).filter(Boolean);
    let activeTab = tabs[0];

    function setPirulaState(isSustentabilidade) {
      const left = pirulaLeftRef.current;
      const right = pirulaRightRef.current;
      if (!left || !right) return;
      gsap.to(left, { y: isSustentabilidade ? 240 : 0, duration: 0.8, ease: 'power2.inOut', overwrite: true });
      gsap.to(right, { y: isSustentabilidade ? -240 : 0, duration: 0.8, ease: 'power2.inOut', overwrite: true });
    }

    const followY = illustration ? gsap.quickTo(illustration, 'y', { duration: 0.5, ease: 'power2.out' }) : null;
    function updateFollow() {
      if (!followY || !activeTab) return;
      const tabRect = activeTab.getBoundingClientRect();
      const visualRect = visual.getBoundingClientRect();
      const visualBaseCenter = visualRect.top + visualRect.height / 2;
      const tabCenter = tabRect.top + tabRect.height / 2;
      followY(tabCenter - visualBaseCenter);
    }

    function activate(tab, key) {
      activeTab = tab;
      updateFollow();
      setPirulaState(key === 'sustentabilidade');
      setActiveKey(key);
    }

    const triggers = [];
    triggers.push(
      ScrollTrigger.create({
        trigger: list,
        start: 'top top+=110',
        end: 'bottom bottom',
        pin: visual,
        pinSpacing: false,
        onUpdate: updateFollow,
      })
    );

    tabs.forEach((tab, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: tab,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => activate(tab, TABS[i].key),
          onEnterBack: () => activate(tab, TABS[i].key),
        })
      );
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      triggers.forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function Features() {
  const bgPirulaRef = useRef(null);
  const listRef = useRef(null);
  const visualRef = useRef(null);
  const illustrationRef = useRef(null);
  const pirulaLeftRef = useRef(null);
  const pirulaRightRef = useRef(null);
  const tabRefs = [useRef(null), useRef(null)];
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const [titleDone, setTitleDone] = useState({});

  useParallax(bgPirulaRef, 0.19);
  useFeatureTabsScroll({ listRef, visualRef, illustrationRef, tabRefs, pirulaLeftRef, pirulaRightRef, setActiveKey });

  return (
    <section className="features-section" id="featuresTabsSection">
      <img ref={bgPirulaRef} className="bg-pirula bg-pirula-features" src="/Assets/pirulas-bkg-03.svg" alt="" />
      <div className="container">
        <div className="features-tabs">
          <div className="features-tabs-visual" ref={visualRef}>
            <div className="feature-block-illustration" ref={illustrationRef}>
              <div className="photo-frame">
                {TABS.map((tab) => (
                  <img
                    key={tab.key}
                    className={`features-tab-img${activeKey === tab.key ? ' is-active' : ''}`}
                    data-tab={tab.key}
                    src={tab.img}
                    alt={tab.imgAlt}
                  />
                ))}
              </div>
              <img ref={pirulaLeftRef} className="pirula pirula-left" src="/Assets/pirulas-left-inovacao-sustentabilidade.svg" alt="" />
              <img ref={pirulaRightRef} className="pirula pirula-right" src="/Assets/pirulas-direita-inovacao-solucoes.svg" alt="" />
            </div>
          </div>
          <div className="features-tabs-list" ref={listRef}>
            {TABS.map((tab, i) => (
              <div
                key={tab.key}
                ref={tabRefs[i]}
                className={`features-tab${activeKey === tab.key ? ' is-active' : ''}`}
                data-tab={tab.key}
              >
                <div className="features-tab-header">
                  <div className="eyebrow"><img src="/Assets/pontos-eybrow.svg" alt="" /><span>{tab.eyebrow}</span></div>
                  <SplitHeading as="h3" onComplete={() => setTitleDone((prev) => ({ ...prev, [tab.key]: true }))}>
                    {tab.heading}
                  </SplitHeading>
                </div>
                <div className="features-tab-body">
                  <FadeAfterTitle as="p" className="paragraph-l" visible={!!titleDone[tab.key]}>
                    {tab.text}
                  </FadeAfterTitle>
                  <button className="btn-pill">
                    {tab.cta} <span className="icon-circle"><svg fill="none"><use href="#icon-arrow-right" /></svg></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
