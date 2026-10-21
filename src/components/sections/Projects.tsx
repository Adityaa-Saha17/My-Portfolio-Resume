import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LuArrowUpRight, LuX } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import MagicBento, { type MagicBentoItem } from '../reactbits/MagicBento';
import ProjectVisual from '../visuals/ProjectVisual';
import SectionHead from './SectionHead';
import { links, projects, type Project } from '../../data/content';
import { rich } from '../../lib/rich';
import { lockScroll } from '../../lib/smooth';
import { useMedia, useReducedMotion } from '../../lib/media';

/** Bento spans per column count; read top-down they follow the network stack. */
type Span = { colSpan: number; rowSpan: number };
const LAYOUTS: Record<3 | 2, Record<Project['id'] | 'github', Span>> = {
  3: {
    dns: { colSpan: 2, rowSpan: 1 },
    lb: { colSpan: 1, rowSpan: 2 },
    tcp: { colSpan: 1, rowSpan: 1 },
    lsm: { colSpan: 1, rowSpan: 1 },
    cpu: { colSpan: 2, rowSpan: 1 },
    github: { colSpan: 1, rowSpan: 1 }
  },
  2: {
    dns: { colSpan: 2, rowSpan: 1 },
    lb: { colSpan: 1, rowSpan: 2 },
    tcp: { colSpan: 1, rowSpan: 1 },
    lsm: { colSpan: 1, rowSpan: 1 },
    cpu: { colSpan: 1, rowSpan: 1 },
    github: { colSpan: 1, rowSpan: 1 }
  }
};
const SINGLE: Span = { colSpan: 1, rowSpan: 1 };

const github = links.find(l => l.kind === 'github')!;

function Tile({ p }: { p: Project }) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span className="rounded-full border border-[rgba(34,211,238,0.35)] bg-[rgba(34,211,238,0.08)] px-2.5 py-0.5 font-medium text-[#8BE7F6]">
          {p.layer}
        </span>
        <span className="text-dim">{p.stack}</span>
      </div>
      <div className="relative min-h-[110px] flex-1">
        <div className="absolute inset-0 flex items-center justify-center px-1">
          <div className="h-full max-h-[190px] w-full max-w-[420px]">
            <ProjectVisual kind={p.id} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="m-0 font-display text-[19px] font-semibold leading-tight tracking-[-0.02em] text-star">{p.title}</h3>
        <p className="m-0 mt-1.5 line-clamp-2 text-[14px] leading-snug text-haze">{p.summary}</p>
      </div>
    </div>
  );
}

function GithubTile() {
  return (
    <div className="flex h-full flex-col justify-between">
      <SiGithub size={34} aria-hidden="true" className="text-star" />
      <div>
        <h3 className="m-0 flex items-center gap-1.5 font-display text-[19px] font-semibold tracking-[-0.02em] text-star">
          All the source <LuArrowUpRight aria-hidden="true" />
        </h3>
        <p className="m-0 mt-1.5 text-[14px] text-haze">github.com/{github.handle}</p>
      </div>
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-[rgba(4,3,16,0.72)] backdrop-blur-sm"
        onClick={onClose}
        tabIndex={-1}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className="glass relative flex max-h-[88svh] w-full max-w-[760px] flex-col overflow-hidden rounded-[28px] shadow-[0_40px_120px_-30px_rgba(124,92,255,0.6)]"
        initial={reduced ? false : { y: 40, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={reduced ? undefined : { y: 24, scale: 0.98, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        style={{ background: 'rgba(14, 10, 40, 0.92)' }}
      >
        <div className="relative h-44 shrink-0 border-b border-[var(--line)] bg-[radial-gradient(80%_120%_at_20%_0%,rgba(124,92,255,0.28),transparent_70%)] p-5 sm:h-52">
          <ProjectVisual kind={project.id} />
        </div>
        <div className="overflow-y-auto p-6 sm:p-9" data-lenis-prevent>
          <div className="flex flex-wrap items-center gap-3 text-[13px]">
            <span className="rounded-full border border-[rgba(34,211,238,0.35)] bg-[rgba(34,211,238,0.08)] px-2.5 py-0.5 font-medium text-[#8BE7F6]">
              {project.layer}
            </span>
            <span className="text-haze">{project.stack}</span>
          </div>
          <h3
            id="project-title"
            className="m-0 mt-4 font-display text-[clamp(1.5rem,3.5vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.025em]"
          >
            {project.title}
          </h3>
          <ul className="rich m-0 mt-6 flex list-none flex-col gap-4 p-0">
            {project.points.map((pt, i) => (
              <li key={i} className="relative pl-6 text-[16px] leading-relaxed text-haze">
                <span
                  className="absolute left-0 top-[0.62em] h-2 w-2 rotate-45 bg-gradient-to-br from-violet to-cyan"
                  aria-hidden="true"
                />
                {rich(pt)}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={project.href} target="_blank" rel="noopener">
              <SiGithub aria-hidden="true" />
              View source
            </a>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-[rgba(7,5,26,0.7)] text-haze transition-colors hover:text-star"
        >
          <LuX size={18} aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const reduced = useReducedMotion();
  const close = useCallback(() => setOpen(null), []);
  const three = useMedia('(min-width: 1024px)', true);
  const two = useMedia('(min-width: 640px)', true);
  const columns = three ? 3 : two ? 2 : 1;
  const span = (id: Project['id'] | 'github') => (columns === 1 ? SINGLE : LAYOUTS[columns][id]);

  const items: MagicBentoItem[] = [
    ...projects.map(p => ({
      id: p.id,
      title: p.title,
      content: <Tile p={p} />,
      ...span(p.id),
      onClick: () => setOpen(p)
    })),
    {
      id: 'github',
      title: 'All the source on GitHub',
      content: <GithubTile />,
      href: github.href,
      target: '_blank',
      rel: 'noopener',
      ...span('github')
    }
  ];

  return (
    <section id="projects" aria-labelledby="h-projects" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <SectionHead id="projects" title="Projects">
        Five systems built from scratch, read from the top of the stack down: the application layer first, the processor last.
        Open any of them for the details.
      </SectionHead>

      <MagicBento
        items={items}
        columns={columns}
        rowHeight={290}
        gap={14}
        radius={26}
        glowColor="#7C5CFF"
        textAutoHide={false}
        enableStars
        particleCount={14}
        enableSpotlight
        spotlightRadius={320}
        enableBorderGlow
        enableTilt={!reduced}
        enableMagnetism={false}
        clickEffect
        style={
          {
            '--mb-surface': 'linear-gradient(180deg, rgba(22,17,58,0.92) 0%, rgba(12,9,34,0.94) 100%)',
            '--mb-edge': 'rgba(167,163,214,0.14)',
            '--mb-ink': '#ECEAFF',
            '--mb-muted': '#A7A3D6'
          } as CSSProperties
        }
      />

      <AnimatePresence>{open && <ProjectDialog key={open.id} project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
