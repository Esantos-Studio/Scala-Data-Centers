// Central place to register GSAP plugins once. Safe to import from any
// client component — gsap.registerPlugin is idempotent.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
