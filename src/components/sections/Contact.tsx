import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { LuCheck, LuCopy, LuMail } from 'react-icons/lu';
import Dock, { type DockItemData } from '../reactbits/Dock';
import ShinyText from '../reactbits/ShinyText';
import { LinkIcon } from '../icons';
import Safe from '../Safe';
import { links, profile } from '../../data/content';
import { asset } from '../../lib/assets';
import { useReducedMotion } from '../../lib/media';

const Hyperspeed = lazy(() => import('../reactbits/Hyperspeed'));

/** Mounts its children only once the section is close to the viewport. */
function useNear<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, near] as const;
}

export default function Contact() {
  const [ref, near] = useNear<HTMLElement>();
  const [boost, setBoost] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const dockItems: DockItemData[] = links.map(l => ({
    label: l.kind === 'email' ? 'Email' : l.kind === 'resume' ? 'Résumé (PDF)' : `${l.label}`,
    icon: (
      <span className="grid h-full w-full place-items-center rounded-[inherit] bg-gradient-to-br from-[#241C5E] to-[#0E0A28] text-star">
        <LinkIcon kind={l.kind} size={22} />
      </span>
    ),
    onClick: () => {
      if (l.kind === 'resume') {
        const a = document.createElement('a');
        a.href = asset(profile.resume);
        a.download = 'Adityaa-Saha-Resume.pdf';
        a.click();
      } else if (l.kind === 'email') {
        window.location.href = l.href;
      } else {
        window.open(l.href, '_blank', 'noopener');
      }
    }
  }));

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="h-contact"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        {near && (
          <Safe>
            <Suspense fallback={null}>
              <Hyperspeed
                curve="gentle"
                speed={reduced ? 0.3 : 1}
                boost={4}
                density={36}
                tailColors={['#7C5CFF', '#5B3FE0', '#B49CFF']}
                headColors={['#22D3EE', '#3AA8E8', '#8BE7F6']}
                poleColors={['#22D3EE']}
                roadColor="#0A0726"
                lineColor="#231C5C"
                background="#07051A"
                glow={0.7}
                dust={60}
                boosting={boost}
                interactive
                className="h-full w-full"
              />
            </Suspense>
          </Safe>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-void to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-void via-void/70 to-transparent" />

      <div className="pointer-events-none mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-4 pt-32 pb-10 text-center sm:px-6 lg:px-10">
        <h2 id="h-contact" className="display m-0 max-w-[12ch] text-[clamp(2.6rem,8vw,6.5rem)]">
          <ShinyText text="Let’s open a connection." color="#ECEAFF" shineColor="#8BE7F6" speed={3.2} />
        </h2>
        <p className="lede mx-auto mt-6 mb-0">
          Email is the quickest way to reach me. I’m happy to talk about internships, full-time roles or anything on this page.
        </p>

        <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            className="btn btn-primary h-14 px-7 text-[17px]"
            href={`mailto:${profile.email}`}
            onPointerEnter={() => setBoost(true)}
            onPointerLeave={() => setBoost(false)}
            onFocus={() => setBoost(true)}
            onBlur={() => setBoost(false)}
          >
            <LuMail aria-hidden="true" />
            Email me
          </a>
          <button type="button" className="btn btn-ghost h-14 px-6" onClick={copy}>
            {copied ? <LuCheck aria-hidden="true" className="text-cyan" /> : <LuCopy aria-hidden="true" />}
            <span>{copied ? 'Copied' : profile.email}</span>
          </button>
        </div>
        <p className="m-0 mt-5 text-[13px] text-dim" aria-live="polite">
          {copied
            ? 'Email address copied to your clipboard.'
            : 'Hover the email button, or press and hold the road, to speed up.'}
        </p>
      </div>

      <div className="relative mx-auto h-[118px] w-full max-w-[640px]">
        <Dock
          items={dockItems}
          baseItemSize={50}
          magnification={72}
          distance={160}
          panelHeight={66}
          gap={10}
          showIndicators={false}
          showBadges={false}
          tiles={false}
          accentColor="#22D3EE"
        />
      </div>

      <footer className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 pb-8 pt-4 text-[14px] text-dim sm:px-6 lg:px-10">
        <p className="m-0">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="m-0">Built with React, three.js and React Bits.</p>
      </footer>
    </section>
  );
}
