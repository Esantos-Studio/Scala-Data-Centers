'use client';

import { useEffect, useRef, useState } from 'react';

function format(value, decimals, decimalComma) {
  let text = value.toFixed(decimals);
  if (decimalComma) text = text.replace('.', ',');
  return text;
}

// Counts up from 0 the first time it scrolls into view (self-triggered),
// or — when `controlled` is true — only when `start` becomes true, so a
// parent effect (e.g. the globe badges' fly-out intro) can decide the
// moment instead of "as soon as it's technically visible".
export default function CountUp({ to, decimals = 0, decimalComma = false, controlled = false, start = false }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(format(0, decimals, decimalComma));
  const countedRef = useRef(false);

  useEffect(() => {
    function run() {
      if (countedRef.current) return;
      countedRef.current = true;
      const duration = 1600;
      const startTime = performance.now();
      function frame(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(format(to * eased, decimals, decimalComma));
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (controlled) {
      if (start) run();
      return;
    }

    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      run();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [controlled, start, to, decimals, decimalComma]);

  return <span ref={ref} className="count-value">{display}</span>;
}
