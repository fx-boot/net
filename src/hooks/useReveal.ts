import { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { useDesktopPointer, useReducedMotion } from './useMotionEnvironment';

export function useReveal<T extends HTMLElement>(reveal: () => void) {
  const root = useRef<T>(null);
  const reduced = useReducedMotion();
  const desktop = useDesktopPointer();
  useEffect(() => {
    const node = root.current;
    if (!node || reduced || !desktop) return;
    const scope = createScope({ root }).add(self => { self?.add('reveal', reveal); });
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      scope.methods.reveal();
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => { observer.disconnect(); scope.revert(); };
  }, [reveal, reduced, desktop]);
  return root;
}
