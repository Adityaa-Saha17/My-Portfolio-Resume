import { useState } from 'react';
import BootIntro from './components/BootIntro';
import Nav from './components/Nav';
import ClickSpark from './components/reactbits/ClickSpark';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Stack from './components/sections/Stack';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import { useSmoothScroll } from './lib/smooth';
import { useReducedMotion } from './lib/media';

const SEEN_KEY = 'adityaa:intro-seen';

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1' || window.location.hash.length > 1;
  } catch {
    return false;
  }
}

export default function App() {
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(() => !reduced && !introAlreadySeen());
  useSmoothScroll(!reduced);

  const finishIntro = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private mode: the intro just plays again next time */
    }
    setIntro(false);
  };

  return (
    <ClickSpark
      sparkColor={['#22D3EE', '#B49CFF', '#ECEAFF']}
      sparkCount={9}
      sparkRadius={22}
      sparkSize={9}
      duration={420}
      disabled={reduced}
    >
      <a
        href="#main"
        className="fixed left-4 top-[-60px] z-[120] rounded-lg bg-star px-3 py-2 font-semibold text-void focus:top-4"
      >
        Skip to content
      </a>
      {intro && <BootIntro onDone={finishIntro} />}
      <Nav />
      <main id="main" className="overflow-x-clip">
        <Hero ready={!intro} />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Education />
        <Contact />
      </main>
    </ClickSpark>
  );
}
