import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// No <StrictMode>: its dev-only double mount makes the WebGL effects (Galaxy, ElectricBorder)
// release their GL context on the first unmount, which leaves the canvas blank in `npm run dev`.
createRoot(document.getElementById('root')!).render(<App />);
