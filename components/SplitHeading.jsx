'use client';

import { useLayoutEffect, useRef } from 'react';

const BLUR_DURATION = 300; // ms — matches TextAnimate's default `duration` prop

// magicui "Blur In by Text" reveal (magicui.design/docs/components/
// text-animate#blur-in-by-text): <TextAnimate animation="blurIn" by="text" />
// — the whole heading blurs/fades in as one block (CSS transition on
// opacity + filter), not staggered per word/character.
//
// - `triggerOnScroll` (default true, for section headings): hidden
//   immediately, but the reveal only plays the first time the heading
//   scrolls into view (threshold 0.4), same as the original build.
// - `triggerOnScroll={false}` (for the hero, where the same heading needs to
//   replay every time its slide becomes active): reveals immediately on
//   mount — the parent remounts this component with a changing `key` to
//   replay it.
export default function SplitHeading({ as: Tag = 'h2', className, children, onComplete, triggerOnScroll = true }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer = null;
    let rafId = null;
    let timeoutId = null;

    function reveal() {
      el.classList.add('blur-in-text');
      rafId = requestAnimationFrame(() => el.classList.add('is-visible'));
      if (onComplete) timeoutId = setTimeout(onComplete, BLUR_DURATION);
    }

    if (triggerOnScroll && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
    } else {
      reveal();
    }

    return () => {
      observer?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
