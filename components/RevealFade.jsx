'use client';

import { useEffect, useRef, useState } from 'react';

// AOS-style fade + rise into place, once, the first time the element
// crosses into the viewport. Replaces the .reveal-fade class + shared
// IntersectionObserver from the static build.
export default function RevealFade({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal-fade${visible ? ' is-visible' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
