import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import DecryptedText from './reactbits/DecryptedText';

const LINES = [
  { dir: '→', flag: 'SYN', detail: 'seq=0' },
  { dir: '←', flag: 'SYN-ACK', detail: 'seq=0 ack=1' },
  { dir: '→', flag: 'ACK', detail: 'connection established' }
];

const STEP = 420;

/** A three-way handshake before the page opens. Plays once per visit; click or press any key to skip. */
export default function BootIntro({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timers = LINES.map((_, i) => window.setTimeout(() => setShown(i + 1), 180 + i * STEP));
    timers.push(window.setTimeout(() => setOpen(false), 180 + LINES.length * STEP + 520));
    const skip = () => setOpen(false);
    window.addEventListener('keydown', skip);
    return () => {
      timers.forEach(t => window.clearTimeout(t));
      window.removeEventListener('keydown', skip);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.55, ease: [0.6, 0, 0.3, 1] } }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-label="Intro animation"
        >
          <div className="w-[min(560px,calc(100vw-32px))] font-mono text-[13px] leading-7 text-haze sm:text-[15px]">
            {LINES.map((line, i) => (
              <div key={line.flag} className="flex gap-4" style={{ opacity: i < shown ? 1 : 0 }}>
                <span className={line.dir === '→' ? 'text-violet' : 'text-cyan'}>{line.dir}</span>
                <span className="w-[5.5rem] text-star">
                  {i < shown ? (
                    <DecryptedText
                      text={line.flag}
                      animateOn="view"
                      speed={28}
                      maxIterations={8}
                      sequential
                      useOriginalCharsOnly={false}
                    />
                  ) : (
                    line.flag
                  )}
                </span>
                <span className={i === LINES.length - 1 ? 'text-cyan' : ''}>{line.detail}</span>
              </div>
            ))}
            <button
              type="button"
              className="mt-8 rounded-full border border-[var(--line)] px-3 py-1 font-sans text-[13px] text-dim transition-colors hover:text-star"
              onClick={e => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Skip intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
