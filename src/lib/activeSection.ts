import { useEffect, useState } from 'react';

/** Which section is under the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join('|')]);
  return active;
}
