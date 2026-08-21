'use client';

import { useEffect } from 'react';

// Continuous translateY drift tied to scroll position — the element's
// distance from the viewport's vertical center, scaled by `speed`. Mirrors
// the site-wide [data-parallax] behavior from the original static build.
// Pass `hold` (a ref to a boolean) to skip updates while some other effect
// (e.g. a one-off intro tween) owns the element's transform.
export default function useParallax(ref, speed, holdRef) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    function update() {
      ticking = false;
      if (holdRef && holdRef.current) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const centerDelta = (rect.top + rect.height / 2) - vh / 2;
      el.style.transform = `translateY(${(centerDelta * -speed).toFixed(2)}px)`;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, speed, holdRef]);
}
