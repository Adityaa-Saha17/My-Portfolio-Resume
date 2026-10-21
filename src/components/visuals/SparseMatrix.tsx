import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from '../../lib/media';

const COLS = 16;
const ROWS = 12;
const BLOCK = 4;

/** Small seeded RNG so the pattern is the same on every visit. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function patterns() {
  const r = rng(23);
  // 2:4 structured: in every group of four along a row, exactly two values survive.
  const twoFour: boolean[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let g = 0; g < COLS / 4; g++) {
      const keep = new Set<number>();
      while (keep.size < 2) keep.add(Math.floor(r() * 4));
      for (let k = 0; k < 4; k++) twoFour.push(keep.has(k));
    }
  }
  // Block-sparse (BCSR): whole 4x4 tiles are either dense or empty.
  const dense = new Set(['0,0', '1,1', '3,0', '2,2', '0,2', '3,1']);
  const bcsr: boolean[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      bcsr.push(dense.has(`${Math.floor(x / BLOCK)},${Math.floor(y / BLOCK)}`));
    }
  }
  return { twoFour, bcsr };
}

const MODES = [
  { key: 'twoFour', label: '2:4 structured', note: 'Needs mma.sp.sync, which Turing (sm_75) lacks' },
  { key: 'bcsr', label: 'Block-sparse (BCSR)', note: 'Dense tiles that run on the regular Tensor Core path of a T4' }
] as const;

export default function SparseMatrix() {
  const { twoFour, bcsr } = useMemo(patterns, []);
  const [mode, setMode] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!auto || reduced) return;
    const t = window.setInterval(() => setMode(m => (m + 1) % 2), 3200);
    return () => window.clearInterval(t);
  }, [auto, reduced]);

  const cells = mode === 0 ? twoFour : bcsr;

  return (
    <figure className="m-0 flex flex-col gap-4">
      <div
        className="grid gap-[3px] rounded-2xl border border-[var(--line)] bg-[rgba(7,5,26,0.6)] p-3"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        aria-hidden="true"
      >
        {cells.map((on, i) => {
          const x = i % COLS;
          const y = Math.floor(i / COLS);
          const edge = mode === 1 && (x % BLOCK === 0 || y % BLOCK === 0);
          return (
            <span
              key={i}
              className="aspect-square rounded-[3px] transition-[background-color,box-shadow,transform] duration-500"
              style={{
                transitionDelay: reduced ? '0ms' : `${(x + y) * 14}ms`,
                background: on ? (mode === 0 ? '#7C5CFF' : '#22D3EE') : 'rgba(167,163,214,0.08)',
                boxShadow: on ? `0 0 10px ${mode === 0 ? 'rgba(124,92,255,0.55)' : 'rgba(34,211,238,0.5)'}` : 'none',
                transform: on ? 'scale(1)' : 'scale(0.82)',
                outline: edge && on ? '1px solid rgba(255,255,255,0.08)' : undefined
              }}
            />
          );
        })}
      </div>
      <figcaption className="flex flex-col gap-3">
        <div
          className="inline-flex w-fit rounded-full border border-[var(--line)] bg-[rgba(17,13,46,0.6)] p-1"
          role="group"
          aria-label="Sparsity pattern"
        >
          {MODES.map((m, i) => (
            <button
              key={m.key}
              type="button"
              aria-pressed={mode === i}
              onClick={() => {
                setAuto(false);
                setMode(i);
              }}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                mode === i ? 'bg-[rgba(124,92,255,0.28)] text-star' : 'text-haze hover:text-star'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="m-0 text-[14px] leading-snug text-haze">{MODES[mode].note}</p>
      </figcaption>
    </figure>
  );
}
