import { lazy, Suspense, useEffect } from 'react';
import { LuDownload } from 'react-icons/lu';
import Galaxy from '../reactbits/Galaxy';
import Shuffle from '../reactbits/Shuffle';
import RotatingText from '../reactbits/RotatingText';
import { LinkIcon } from '../icons';
import Safe from '../Safe';
import { links, profile } from '../../data/content';
import { asset } from '../../lib/assets';
import { useReducedMotion, useWide } from '../../lib/media';
import badgeFront from '../../assets/badge-front.webp';
import badgeBack from '../../assets/badge-back.webp';
import badgeStrap from '../../assets/badge-strap.webp';

const loadLanyard = () => import('../reactbits/Lanyard');
const Lanyard = lazy(loadLanyard);

const SOCIAL = links.filter(l => ['github', 'linkedin', 'codeforces', 'leetcode'].includes(l.kind));

export default function Hero({ ready }: { ready: boolean }) {
  const wide = useWide();
  const reduced = useReducedMotion();

  // Fetch the three.js chunk while the intro plays, mount it once the page opens so its swing-in is visible.
  useEffect(() => {
    loadLanyard();
  }, []);

  const nameClass =
    'display block! normal-case! leading-[0.98]! text-[clamp(3.4rem,15vw,6.5rem)]! lg:text-[clamp(5rem,8.4vw,8.5rem)]! text-star';

  return (
    <section id="top" className="relative isolate overflow-hidden" aria-label="Introduction">
      {/* Space: CSS nebula underneath, WebGL star field on top */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(60% 55% at 12% 18%, rgba(124,92,255,0.30), transparent 70%), radial-gradient(50% 50% at 92% 88%, rgba(34,211,238,0.16), transparent 70%), #07051A'
        }}
      />
      <div className="absolute inset-0 -z-10">
        <Safe>
          <Galaxy
            starColors={['#7C5CFF', '#22D3EE', '#ECEAFF', '#B49CFF']}
            density={1.1}
            glowIntensity={0.35}
            saturation={0.6}
            twinkleIntensity={0.4}
            rotationSpeed={0.04}
            starSpeed={0.35}
            speed={0.8}
            mouseRepulsion
            repulsionStrength={1.6}
            clickWarp={false}
            transparent
            disableAnimation={reduced}
            dpr={Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1, 1.5)}
          />
        </Safe>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-void" />

      <div className="mx-auto grid min-h-[100svh] max-w-[1280px] grid-rows-[auto_1fr] px-4 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:grid-rows-1 lg:px-10">
        {/* Badge: hangs from the top edge of the screen */}
        <div className="relative order-1 -mx-4 h-[56svh] min-h-[380px] sm:-mx-6 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:min-h-0 lg:w-[50vw]">
          <div className="absolute inset-0">
            <Safe>
              <Suspense fallback={null}>
                {ready && (
                  <Lanyard
                    frontImage={badgeFront}
                    backImage={badgeBack}
                    strapImage={badgeStrap}
                    cardColor="#0A0726"
                    finish="holographic"
                    metal="silver"
                    size={wide ? 0.52 : 0.62}
                    strapLength={wide ? 0.42 : 0.3}
                    strapWidth={0.7}
                    cornerRadius={0.35}
                    breeze={0.35}
                    intro
                    className="h-full w-full"
                  />
                )}
              </Suspense>
            </Safe>
          </div>
          <p className="pointer-events-none absolute inset-x-0 bottom-2 m-0 text-center text-[13px] text-dim lg:bottom-10">
            Drag the badge around. Click it to flip.
          </p>
        </div>

        <div className="relative order-2 flex flex-col justify-center pb-16 pt-2 lg:order-1 lg:py-28">
          <p className="glass m-0 mb-7 inline-flex w-fit items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[14px] text-haze">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Open to software and systems roles
          </p>

          <h1 className="m-0" aria-label={profile.name}>
            {ready ? (
              <>
                <Shuffle
                  text={profile.first}
                  tag="span"
                  className={nameClass}
                  shuffleDirection="up"
                  duration={0.45}
                  shuffleTimes={2}
                  stagger={0.04}
                  animationMode="evenodd"
                  scrambleCharset="01ABCDEF<>/{}#"
                  triggerOnce
                  triggerOnHover
                  textAlign="left"
                />
                <Shuffle
                  text={profile.last}
                  tag="span"
                  className={nameClass}
                  shuffleDirection="up"
                  duration={0.45}
                  shuffleTimes={2}
                  stagger={0.04}
                  animationMode="evenodd"
                  scrambleCharset="01ABCDEF<>/{}#"
                  triggerOnce
                  triggerOnHover
                  textAlign="left"
                />
              </>
            ) : (
              <>
                <span className={`${nameClass} opacity-0`}>{profile.first}</span>
                <span className={`${nameClass} opacity-0`}>{profile.last}</span>
              </>
            )}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[clamp(1.15rem,2.4vw,1.75rem)] font-medium tracking-[-0.02em] text-haze">
            <span>I build</span>
            <RotatingText
              texts={profile.rotating}
              mainClassName="overflow-hidden rounded-xl bg-gradient-to-r from-violet to-[#3AA8E8] px-3 py-1 text-white"
              staggerFrom="last"
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2400}
              auto={ready && !reduced}
            />
          </div>

          <p className="lede mt-6 mb-0">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a className="btn btn-primary" href={asset(profile.resume)} download>
              <LuDownload aria-hidden="true" />
              Download résumé
            </a>
            <a className="btn btn-ghost" href="#projects">
              See projects
            </a>
          </div>

          <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0">
            {SOCIAL.map(l => (
              <li key={l.kind}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] text-haze transition-colors hover:border-cyan hover:text-star"
                  aria-label={`${l.label}: ${l.handle}`}
                  title={`${l.label}: ${l.handle}`}
                >
                  <LinkIcon kind={l.kind} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
