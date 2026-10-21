import SectionHead from './SectionHead';
import { education } from '../../data/content';

export default function Education() {
  return (
    <section id="education" aria-labelledby="h-education" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <SectionHead id="education" title="Education" />
      <ol className="relative m-0 list-none p-0">
        <span
          className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-cyan via-violet to-transparent"
          aria-hidden="true"
        />
        {education.map((e, i) => (
          <li
            key={e.title}
            className="relative grid gap-2 pb-12 pl-10 last:pb-0 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-8"
          >
            <span
              className={`absolute left-0 top-[0.45em] h-[15px] w-[15px] rounded-full border-2 ${
                i === 0 ? 'border-cyan bg-cyan shadow-[0_0_18px_rgba(34,211,238,0.8)]' : 'border-violet bg-void'
              }`}
              aria-hidden="true"
            />
            <span className="text-[15px] font-medium tabular-nums text-cyan">{e.years}</span>
            <div>
              <h3 className="m-0 font-display text-[clamp(1.15rem,2.2vw,1.5rem)] font-semibold leading-tight tracking-[-0.02em] text-star">
                {e.title}
              </h3>
              <p className="m-0 mt-1 text-[16px] text-haze">{e.place}</p>
            </div>
            <span className="text-[16px] font-medium tabular-nums text-star md:text-right">{e.score}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
