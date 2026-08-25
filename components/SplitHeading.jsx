'use client';

import { useLayoutEffect, useRef } from 'react';

// magicui "Blur In by Text" reveal (magicui.design/docs/components/
// text-animate#blur-in-by-text): <TextAnimate animation="blurIn" as="h1">
// — the demo doesn't pass a `by` prop, so it uses the component's default
// (by="word"): each word blurs/fades in with a stagger, not the whole
// block at once and not per character.
//
// This component walks the heading's own rendered DOM (via ref, after
// mount) and wraps each word in its own <span> — preserving any authored
// <span> color-highlights already inside the heading, since only text
// nodes are touched, not the element structure. That also keeps each
// blurred unit word-sized, so the blur never bleeds past the heading's
// own line box onto the eyebrow/paragraph next to it.
//
// - `triggerOnScroll` (default true, for section headings): hidden
//   immediately, but the reveal only plays the first time the heading
//   scrolls into view (threshold 0.4), same as the original build.
// - `triggerOnScroll={false}` (for the hero, where the same heading needs to
//   replay every time its slide becomes active): reveals immediately on
//   mount — the parent remounts this component with a changing `key` to
//   replay it.
const DURATION = 0.3; // seconds — matches TextAnimate's default `duration` prop
const ITEM_TRANSITION_MS = 300; // ms — the blurIn item preset's own fixed duration

function splitIntoWordSpans(root) {
  const spans = [];

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text) return;
      const parts = text.split(/(\s+)/).filter(Boolean);
      if (parts.length === 0) return;
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'blur-in-word';
          span.textContent = part;
          frag.appendChild(span);
          spans.push(span);
        }
      });
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  }

  Array.from(root.childNodes).forEach(walk);
  return spans;
}

export default function SplitHeading({ as: Tag = 'h2', className, children, onComplete, triggerOnScroll = true }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = splitIntoWordSpans(el);
    const stagger = spans.length ? DURATION / spans.length : 0;
    const timeouts = [];
    let observer = null;

    function reveal() {
      spans.forEach((span, i) => {
        timeouts.push(setTimeout(() => span.classList.add('is-visible'), i * stagger * 1000));
      });
      if (onComplete) {
        const total = Math.max(0, spans.length - 1) * stagger * 1000 + ITEM_TRANSITION_MS;
        timeouts.push(setTimeout(onComplete, total));
      }
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
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
