'use client';

import { useEffect, useRef, useState } from 'react';
import RevealFade from './RevealFade';
import FadeAfterTitle from './FadeAfterTitle';
import SplitHeading from './SplitHeading';
import CountUp from './CountUp';
import useParallax from '@/hooks/useParallax';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const ORBIT_DOTS = [1, 2, 3, 4, 5, 6, 7];

const BADGES = [
  { key: 1, className: 'presence-badge-1', to: 13, prefix: null, label: <>data centers<br />em operação</> },
  { key: 2, className: 'presence-badge-2', to: 4, prefix: null, label: <>países<br />na América Latina</> },
  { key: 3, className: 'presence-badge-3', to: 12, prefix: '+', suffix: 'M', label: 'm² em propriedades' },
];

// Globe stat badges — intro. Each badge starts scaled down, transparent and
// behind the globe canvas, sitting exactly at the globe's center; on scroll
// it zooms/flies out to its normal floating position. Runs once; while
// mid-intro the badge's own parallax hook is held off via `holdRefs` so the
// two effects don't fight over `transform`.
function useBadgeIntro(wrapRef, badgeRefs, holdRefs, onDone) {
  useEffect(() => {
    const wrap = wrapRef.current;
    const badges = badgeRefs.map((r) => r.current).filter(Boolean);
    if (!wrap || !badges.length) return;

    const wrapRect = wrap.getBoundingClientRect();
    const wrapCenter = { x: wrapRect.left + wrapRect.width / 2, y: wrapRect.top + wrapRect.height / 2 };
    const triggers = [];

    badges.forEach((badge, i) => {
      const prevTransform = badge.style.transform;
      badge.style.transform = 'none';
      const r = badge.getBoundingClientRect();
      badge.style.transform = prevTransform;
      const center = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      const fromX = wrapCenter.x - center.x;
      const fromY = wrapCenter.y - center.y;

      gsap.set(badge, { x: fromX, y: fromY, scale: 0.15, opacity: 0, zIndex: 0 });

      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ delay: i * 0.15, defaults: { ease: 'power3.out' } });
          tl.to(badge, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.1 }, 0);
          tl.set(badge, { zIndex: 5 }, 0.45);
          tl.eventCallback('onComplete', () => {
            holdRefs[i].current = false;
            onDone(i);
          });
        },
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// Globe — independent scroll drift + mouse-centering, plus a soft
// continuous parallax layered on top. The globe drifts vertically on its
// own as the section scrolls, decoupled from the text column beside it.
// Moving the mouse toward the section's vertical center cancels the
// section-scroll drift (not the parallax term), so the globe settles back
// into alignment with the content exactly when the cursor "centers" the two
// columns.
function useGlobeDrift(sectionRef, globeRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const globe = globeRef.current;
    if (!section || !globe) return;

    const SCROLL_RANGE = 60;
    const MOUSE_RADIUS = 220;
    const PARALLAX_SPEED = 0.12;

    let scrollOffset = 0;
    let mouseFactor = 1;
    let parallaxY = 0;
    let ticking = false;

    function apply() {
      globe.style.transform = `translateX(-100px) translateY(${(scrollOffset * mouseFactor + parallaxY).toFixed(2)}px)`;
    }
    function updateParallax() {
      ticking = false;
      const vh = window.innerHeight;
      const rect = globe.getBoundingClientRect();
      const centerDelta = (rect.top + rect.height / 2) - vh / 2;
      parallaxY = centerDelta * -PARALLAX_SPEED;
      apply();
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    }
    function onMouseMove(e) {
      const rect = section.getBoundingClientRect();
      const sectionCenterY = rect.top + rect.height / 2;
      const dist = Math.abs(e.clientY - sectionCenterY);
      mouseFactor = Math.min(1, dist / MOUSE_RADIUS);
      apply();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    updateParallax();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollOffset = (self.progress - 0.5) * 2 * SCROLL_RANGE;
        apply();
      },
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      trigger.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function GlobalPresence() {
  const sectionRef = useRef(null);
  const bgPirulaRef = useRef(null);
  const globeRef = useRef(null);
  const badgeRefs = [useRef(null), useRef(null), useRef(null)];
  const holdRefs = [useRef(true), useRef(true), useRef(true)];
  const [titleDone, setTitleDone] = useState(false);
  const [badgeReady, setBadgeReady] = useState([false, false, false]);

  useParallax(bgPirulaRef, 0.16);
  useParallax(badgeRefs[0], 0.06, holdRefs[0]);
  useParallax(badgeRefs[1], 0.11, holdRefs[1]);
  useParallax(badgeRefs[2], 0.06, holdRefs[2]);
  useBadgeIntro(globeRef, badgeRefs, holdRefs, (i) =>
    setBadgeReady((prev) => prev.map((v, idx) => (idx === i ? true : v)))
  );
  useGlobeDrift(sectionRef, globeRef);

  return (
    <section className="section global-presence-section" ref={sectionRef}>
      <img ref={bgPirulaRef} className="bg-pirula bg-pirula-globalpresence" src="/Assets/pirulas-bkg-02.svg" alt="" />
      <div className="container">
        <div className="global-presence-content">
          <div className="global-presence-text-block">
            <RevealFade as="div" className="eyebrow">
              <img src="/Assets/pontos-eybrow.svg" alt="" />
              <span>Presença estratégica na América Latina</span>
            </RevealFade>
            <SplitHeading as="h2" onComplete={() => setTitleDone(true)}>
              Presença estratégica para <span>habilitar o futuro</span>
            </SplitHeading>
            <FadeAfterTitle as="p" className="paragraph-l" visible={titleDone}>
              Com presença nos principais mercados da América Latina, desenvolvemos uma plataforma de infraestrutura digital estrategicamente localizada, próxima a hubs de nuvem, cabos submarinos e ecossistemas de interconexão da região. Em operação, construção e desenvolvimento, nossos data centers combinam excelência operacional, alta densidade e energia renovável para acompanhar a evolução dos negócios dos nossos clientes.
            </FadeAfterTitle>
          </div>
          <button className="btn-pill">
            Explorar Data Centers
            <span className="icon-circle"><svg fill="none"><use href="#icon-arrow-right" /></svg></span>
          </button>
        </div>
        <div className="globe-wrap" ref={globeRef}>
          <div className="globe-orbits" aria-hidden="true">
            <span className="orbit-ring orbit-ring-1" />
            <span className="orbit-ring orbit-ring-2" />
            <span className="orbit-ring orbit-ring-3" />
            <span className="orbit-ring orbit-ring-4" />
            {ORBIT_DOTS.map((n) => (
              <div className={`orbit-track orbit-track-${n}`} key={n}>
                <div className={`orbit-spin orbit-spin-${n}`}>
                  <span className="orbit-dot" />
                </div>
              </div>
            ))}
          </div>
          <img className="globe-disc" src="/Assets/globe-all.svg" alt="Globo — presença da Scala Data Centers na América Latina" draggable="false" />
          {BADGES.map((badge, i) => (
            <div key={badge.key} ref={badgeRefs[i]} className={`presence-badge ${badge.className} badge-intro parallax-hold`}>
              <p className="presence-badge-number">
                {badge.prefix}
                <CountUp to={badge.to} controlled start={badgeReady[i]} />
                {badge.suffix}
              </p>
              <p className="presence-badge-label">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
