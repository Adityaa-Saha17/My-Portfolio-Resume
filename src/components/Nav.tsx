import PillNav from './reactbits/PillNav';
import { LuDownload } from 'react-icons/lu';
import { useActiveSection } from '../lib/activeSection';
import { asset } from '../lib/assets';
import { profile } from '../data/content';
import { useMedia } from '../lib/media';

const ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' }
];

const IDS = ITEMS.map(i => i.href.slice(1));

const Mark = () => (
  <svg viewBox="0 0 64 64" width="26" height="26" aria-hidden="true">
    <defs>
      <linearGradient id="nav-mark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7C5CFF" />
        <stop offset="1" stopColor="#22D3EE" />
      </linearGradient>
    </defs>
    <path d="M32 6l4.4 17.6L54 28l-17.6 4.4L32 50l-4.4-17.6L10 28l17.6-4.4z" fill="url(#nav-mark)" />
    <circle cx="49" cy="50" r="4" fill="#22D3EE" />
  </svg>
);

export default function Nav() {
  const active = useActiveSection(IDS);
  const roomy = useMedia('(min-width: 900px)', true);
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 overflow-x-clip">
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 pt-4 sm:px-6 lg:justify-center lg:px-10">
        <div className="pointer-events-auto min-w-0">
          <PillNav
            logo={<Mark />}
            logoAlt="Adityaa Saha, back to top"
            logoHref="#top"
            items={ITEMS}
            activeHref={active ? `#${active}` : undefined}
            defaultActiveIndex={-1}
            theme="dark"
            surface="glass"
            size="md"
            hoverEffect="fill"
            indicator="dot"
            highlightColor="#7C5CFF"
            highlightTextColor="#ffffff"
            barColor="rgba(17, 13, 46, 0.55)"
            textColor="#ECEAFF"
            itemStyle="plain"
            collapse={roomy ? 'never' : 'always'}
          />
        </div>
        <a
          href={asset(profile.resume)}
          download
          aria-label="Download résumé (PDF)"
          className="btn btn-ghost pointer-events-auto h-11 shrink-0 px-3.5 text-[15px] sm:px-4 lg:absolute lg:right-10 lg:top-4"
        >
          <LuDownload aria-hidden="true" />
          <span className="hidden sm:inline">Résumé</span>
        </a>
      </div>
    </header>
  );
}
