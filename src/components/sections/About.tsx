import ScrollReveal from '../reactbits/ScrollReveal';
import { profile } from '../../data/content';

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1280px] px-4 pt-24 pb-28 sm:px-6 lg:px-10 lg:pt-36 lg:pb-40">
      <div className="max-w-[1040px]">
        <ScrollReveal
          baseOpacity={0.12}
          enableBlur
          blurStrength={6}
          baseRotation={2}
          containerClassName="m-0"
          textClassName="font-display text-[clamp(1.55rem,3.6vw,2.9rem)]! leading-[1.28]! font-medium! tracking-[-0.025em] text-star"
          rotationEnd="bottom 60%"
          wordAnimationEnd="bottom 55%"
        >
          {profile.about}
        </ScrollReveal>
      </div>

      <dl className="m-0 mt-16 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 lg:mt-24">
        {profile.facts.map(f => (
          <div key={f.term} className="bg-void/95 p-6 lg:p-8">
            <dt className="text-[14px] font-medium text-cyan">{f.term}</dt>
            <dd className="m-0 mt-2 text-[17px] leading-snug text-star">{f.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
