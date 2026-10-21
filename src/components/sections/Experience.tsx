import { LuArrowUpRight } from 'react-icons/lu';
import ElectricBorder from '../reactbits/ElectricBorder';
import SparseMatrix from '../visuals/SparseMatrix';
import SectionHead from './SectionHead';
import { experience } from '../../data/content';
import { rich } from '../../lib/rich';
import { useReducedMotion } from '../../lib/media';

export default function Experience() {
  const reduced = useReducedMotion();
  return (
    <section
      id="experience"
      aria-labelledby="h-experience"
      className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
      <SectionHead id="experience" title="Experience" />

      <ElectricBorder
        color="#22D3EE"
        glowColor="#7C5CFF"
        speed={0.8}
        chaos={0.45}
        thickness={1.4}
        borderRadius={28}
        intensity={0.75}
        arcs={reduced ? 0 : 1}
        className="rounded-[28px]"
      >
        <article className="relative grid gap-10 rounded-[28px] bg-[rgba(14,10,40,0.82)] p-6 sm:p-9 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:p-12">
          <div>
            <p className="m-0 text-[15px] font-medium text-cyan">{experience.dates}</p>
            <h3 className="m-0 mt-3 font-display text-[clamp(1.6rem,3vw,2.35rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
              {experience.role}
            </h3>
            <p className="m-0 mt-2 text-[17px] text-star/90">{experience.org}</p>
            <p className="m-0 mt-1 text-[15px] text-haze">Advisor: {experience.advisor}</p>

            <ul className="rich m-0 mt-8 flex list-none flex-col gap-4 p-0">
              {experience.points.map((p, i) => (
                <li key={i} className="relative pl-6 text-[16.5px] leading-relaxed text-haze">
                  <span
                    className="absolute left-0 top-[0.62em] h-2 w-2 rotate-45 bg-gradient-to-br from-violet to-cyan"
                    aria-hidden="true"
                  />
                  {rich(p)}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              {experience.links.map(l => (
                <a key={l.label} className="btn btn-ghost h-11 text-[15px]" href={l.href} target="_blank" rel="noopener">
                  {l.label}
                  <LuArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pt-10">
            <SparseMatrix />
          </div>
        </article>
      </ElectricBorder>
    </section>
  );
}
