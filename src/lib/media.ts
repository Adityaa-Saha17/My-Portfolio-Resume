import { useSyncExternalStore } from 'react';

export function useMedia(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    onChange => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : fallback),
    () => fallback
  );
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)', true);
export const useWide = () => useMedia('(min-width: 1024px)', true);
