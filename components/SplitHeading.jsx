'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText } from '@/lib/gsap';

// GSAP SplitText character reveal (matches magicui's slideLeft/by-character
// text-animate).
//
// - `triggerOnScroll` (default true, for section headings): chars are split
//   and hidden immediately, but the reveal tween only plays the first time
//   the heading scrolls into view (threshold 0.4), same as the original
//   IntersectionObserver-driven build.
// - `triggerOnScroll={false}` (for the hero, where the same heading needs to
//   replay every time its slide becomes active): reveals immediately on
//   mount — the parent remounts this component with a changing `key` to
//   replay it.
export default function SplitHeading({ as: Tag = 'h2', className, children, onComplete, triggerOnScroll = true }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitText(el, { type: 'chars,words,lines' });
    gsap.set(split.chars, { opacity: 0, x: 20 });

    let tween = null;
    let observer = null;

    function reveal() {
      tween = gsap.to(split.chars, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
        stagger: 0.03,
        overwrite: true,
        onComplete,
      });
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
      tween?.kill();
      split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
