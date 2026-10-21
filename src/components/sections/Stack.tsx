import { Fragment, type CSSProperties } from 'react';
import { SiC, SiCmake, SiCplusplus, SiGit, SiGnubash, SiLinux, SiNvidia, SiPrometheus, SiPytorch, SiRiscv } from 'react-icons/si';
import ScrollVelocity from '../reactbits/ScrollVelocity';
import LogoLoop, { type LogoItem } from '../reactbits/LogoLoop';
import SpotlightCard from '../reactbits/SpotlightCard';
import SectionHead from './SectionHead';
import { concepts, skills } from '../../data/content';

const TOOLS: LogoItem[] = [
  { node: <SiCplusplus />, title: 'C++', hoverColor: '#8BE7F6' },
  { node: <SiC />, title: 'C', hoverColor: '#8BE7F6' },
  { node: <SiNvidia />, title: 'CUDA', hoverColor: '#76B900' },
  { node: <SiLinux />, title: 'Linux', hoverColor: '#ECEAFF' },
  { node: <SiGnubash />, title: 'Bash', hoverColor: '#ECEAFF' },
  { node: <SiPytorch />, title: 'PyTorch / NCCL', hoverColor: '#EE4C2C' },
  { node: <SiCmake />, title: 'CMake', hoverColor: '#8BE7F6' },
  { node: <SiGit />, title: 'Git', hoverColor: '#F05032' },
  { node: <SiPrometheus />, title: 'Prometheus', hoverColor: '#E6522C' },
  { node: <SiRiscv />, title: 'RISC-V', hoverColor: '#F9B21D' }
];

function Row({ words }: { words: string[] }) {
  return (
    <>
      {words.map(w => (
        <Fragment key={w}>
          <span>{w}</span>
          <span className="mx-[0.5em] text-cyan" aria-hidden="true">
            ✦
          </span>
        </Fragment>
      ))}
    </>
  );
}

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="h-stack" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <SectionHead id="stack" title="Stack">
          The languages, tools and ideas the projects above are made of.
        </SectionHead>
      </div>

      <div className="select-none font-display text-star" aria-hidden="true">
        <ScrollVelocity
          texts={concepts.map(row => (
            <Row key={row[0]} words={row} />
          ))}
          velocity={36}
          numCopies={4}
          fontSize="clamp(1.75rem, 4.6vw, 4rem)"
          fontWeight={700}
          className="tracking-[-0.03em]"
          outlineAlternate
          fadeEdges
          skewWithVelocity={4}
          gap={0}
        />
      </div>

      <div className="mx-auto mt-16 max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="text-haze">
          <LogoLoop
            logos={TOOLS}
            speed={40}
            logoHeight={40}
            gap={64}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#07051A"
            labels="below"
            ariaLabel="Tools I use"
          />
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {skills.map(group => (
            <SpotlightCard
              key={group.group}
              className="rounded-3xl p-6 sm:p-8"
              spotlightColor="rgba(124, 92, 255, 0.28)"
              style={{ '--spotlight-card-surface': 'rgba(14, 10, 40, 0.7)' } as CSSProperties}
            >
              <h3 className="m-0 font-display text-[18px] font-semibold tracking-[-0.02em] text-star">{group.group}</h3>
              <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
                {group.items.map(item => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--line)] bg-[rgba(7,5,26,0.5)] px-3 py-1 text-[14.5px] text-haze"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
