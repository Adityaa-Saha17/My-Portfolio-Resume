import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { ProjectVisual as Kind } from '../../data/content';
import './visuals.css';

/** Runs the CSS/SMIL animation only while the diagram is on screen. */
function Live({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const svg = ref.current?.querySelector('svg');
    if (!svg) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (live && !reduce) svg.unpauseAnimations?.();
    else svg.pauseAnimations?.();
  }, [live]);
  return (
    <div ref={ref} className="pv-wrap h-full w-full" data-live={live ? '' : undefined}>
      {children}
    </div>
  );
}

function Dns() {
  const servers = [
    { y: 24, label: 'root  .' },
    { y: 70, label: 'tld   in.' },
    { y: 116, label: 'auth  ac.in.' }
  ];
  return (
    <svg
      className="pv pv-dns"
      viewBox="0 0 300 140"
      role="img"
      aria-label="Diagram: resolver queries root, TLD and authoritative servers"
    >
      {servers.map(s => (
        <line key={s.y} className="wire" x1="52" y1="70" x2="190" y2={s.y} />
      ))}
      <circle className="node hot" cx="44" cy="70" r="14" />
      <text x="44" y="102" fontSize="10" textAnchor="middle">
        resolver
      </text>
      {servers.map(s => (
        <g key={s.y}>
          <circle className="node" cx="198" cy={s.y} r="9" />
          <text x="216" y={s.y + 3.5} fontSize="10" xmlSpace="preserve">
            {s.label}
          </text>
        </g>
      ))}
      <circle className="packet" r="4">
        <animateMotion
          dur="4.8s"
          repeatCount="indefinite"
          path="M44,70 L198,24 L44,70 L198,70 L44,70 L198,116 L44,70"
          keyPoints="0;0.1667;0.3333;0.5;0.6667;0.8333;1;1"
          keyTimes="0;0.13;0.26;0.39;0.52;0.65;0.8;1"
          calcMode="linear"
        />
      </circle>
      <g opacity="0">
        <animate attributeName="opacity" dur="4.8s" repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;0.8;0.84;0.97;1" />
        <rect x="14" y="20" width="62" height="20" rx="10" fill="rgba(34,211,238,0.14)" stroke="rgba(34,211,238,0.5)" />
        <text x="45" y="33.5" fontSize="9.5" textAnchor="middle" style={{ fill: '#8BE7F6' }}>
          cached
        </text>
      </g>
    </svg>
  );
}

function LoadBalancer() {
  const backends = [18, 52, 88, 122];
  const live = [0, 1, 3];
  return (
    <svg
      className="pv pv-lb"
      viewBox="0 0 300 140"
      role="img"
      aria-label="Diagram: load balancer spreading requests across backends, one isolated by a circuit breaker"
    >
      <line className="wire" x1="0" y1="70" x2="64" y2="70" />
      {backends.map((y, i) => (
        <line key={y} className="wire" x1="104" y1="70" x2="214" y2={y} strokeDasharray={i === 2 ? '3 4' : undefined} />
      ))}
      <rect className="node hot" x="64" y="52" width="40" height="36" rx="10" />
      <text x="84" y="73.5" fontSize="10" textAnchor="middle" style={{ fill: '#ECEAFF' }}>
        lb
      </text>
      {backends.map((y, i) => (
        <g key={y}>
          <rect className="node" x="214" y={y - 11} width="44" height="22" rx="6" stroke={i === 2 ? '#ff6b8b' : undefined} />
          <text x="236" y={y + 3.5} fontSize="9" textAnchor="middle" style={i === 2 ? { fill: '#ff8fa8' } : undefined}>
            {i === 2 ? 'open' : `b${i + 1}`}
          </text>
        </g>
      ))}
      {live.map((b, k) => (
        <circle key={b} className={k % 2 ? 'packet v' : 'packet'} r="3.5" opacity="0">
          <animateMotion
            dur="3s"
            begin={`${k}s`}
            repeatCount="indefinite"
            path={`M0,70 L84,70 L214,${backends[b]}`}
            keyPoints="0;1;1"
            keyTimes="0;0.6;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            dur="3s"
            begin={`${k}s`}
            repeatCount="indefinite"
            values="0;1;1;0;0"
            keyTimes="0;0.05;0.55;0.62;1"
          />
        </circle>
      ))}
    </svg>
  );
}

function Tcp() {
  const arrows = [
    { x1: 60, y1: 30, x2: 240, y2: 56, label: 'SYN', ly: 36 },
    { x1: 240, y1: 64, x2: 60, y2: 90, label: 'SYN-ACK', ly: 70 },
    { x1: 60, y1: 98, x2: 240, y2: 124, label: 'ACK', ly: 104 }
  ];
  return (
    <svg className="pv pv-tcp" viewBox="0 0 300 140" role="img" aria-label="Diagram: TCP three-way handshake">
      <text x="60" y="12" fontSize="10" textAnchor="middle">
        client
      </text>
      <text x="240" y="12" fontSize="10" textAnchor="middle">
        server
      </text>
      <line className="wire" x1="60" y1="20" x2="60" y2="136" />
      <line className="wire" x1="240" y1="20" x2="240" y2="136" />
      {arrows.map((a, i) => {
        const angle = (Math.atan2(a.y2 - a.y1, a.x2 - a.x1) * 180) / Math.PI;
        return (
          <g key={a.label}>
            <line className={`arrow arrow-${i + 1}`} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#22D3EE" strokeWidth="1.6" />
            <path
              className={`head head-${i + 1}`}
              d="M0,0 L-8,-4 L-8,4 z"
              fill="#22D3EE"
              transform={`translate(${a.x2} ${a.y2}) rotate(${angle})`}
            />
            <text className={`lbl lbl-${i + 1}`} x="150" y={a.ly} fontSize="10" textAnchor="middle" style={{ fill: '#ECEAFF' }}>
              {a.label}
            </text>
          </g>
        );
      })}
      <text className="est" x="150" y="138" fontSize="9" textAnchor="middle" style={{ fill: '#8BE7F6' }}>
        established
      </text>
    </svg>
  );
}

function Lsm() {
  const levels = [
    { y: 62, n: 2, w: 34, label: 'L0' },
    { y: 90, n: 4, w: 40, label: 'L1' },
    { y: 118, n: 6, w: 34, label: 'L2' }
  ];
  return (
    <svg className="pv pv-lsm" viewBox="0 0 300 140" role="img" aria-label="Diagram: LSM tree memtable flushing into levels">
      <rect className="node hot" x="40" y="6" width="150" height="28" rx="8" />
      <rect className="fill" x="46" y="12" width="138" height="16" rx="4" fill="rgba(34,211,238,0.35)" />
      <text x="200" y="24" fontSize="10">
        memtable
      </text>
      <rect className="flush" x="46" y="12" width="34" height="16" rx="4" fill="#22D3EE" />
      {levels.map((l, li) => (
        <g key={l.label}>
          <text x="12" y={l.y + 4} fontSize="10">
            {l.label}
          </text>
          {Array.from({ length: l.n }).map((_, i) => (
            <rect
              key={i}
              className={li === 1 && i === l.n - 1 ? 'grow' : undefined}
              x={40 + i * (l.w + 6)}
              y={l.y - 9}
              width={l.w}
              height="18"
              rx="4"
              fill={li === 0 ? 'rgba(124,92,255,0.55)' : li === 1 ? 'rgba(124,92,255,0.38)' : 'rgba(124,92,255,0.22)'}
              stroke="rgba(167,163,214,0.3)"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function Cpu() {
  const stages = ['IF', 'ID', 'EX', 'MEM', 'WB'];
  const rows = 4;
  const w = 30;
  const h = 22;
  const beat = 0.6;
  return (
    <svg
      className="pv pv-cpu"
      viewBox="0 0 300 140"
      role="img"
      aria-label="Diagram: five-stage pipeline with overlapping instructions"
    >
      {Array.from({ length: rows }).map((_, r) =>
        stages.map((s, c) => {
          const cycle = r + c;
          return (
            <g key={`${r}-${c}`}>
              <rect
                className="cell"
                x={34 + cycle * (w + 2)}
                y={10 + r * (h + 8)}
                width={w}
                height={h}
                rx="5"
                style={{ animationDelay: `${cycle * beat - 0.5}s` }}
              />
              <text
                x={34 + cycle * (w + 2) + w / 2}
                y={10 + r * (h + 8) + 14.5}
                fontSize="9"
                textAnchor="middle"
                style={{ fill: '#ECEAFF' }}
              >
                {s}
              </text>
            </g>
          );
        })
      )}
      {Array.from({ length: rows }).map((_, r) => (
        <text key={r} x="8" y={10 + r * (h + 8) + 14.5} fontSize="9">
          i{r + 1}
        </text>
      ))}
    </svg>
  );
}

export default function ProjectVisual({ kind }: { kind: Kind }) {
  const map = { dns: Dns, lb: LoadBalancer, tcp: Tcp, lsm: Lsm, cpu: Cpu } as const;
  const Diagram = map[kind];
  return (
    <Live>
      <Diagram />
    </Live>
  );
}
