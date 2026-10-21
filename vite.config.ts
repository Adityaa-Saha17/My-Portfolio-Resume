import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Résumé.pdf stays at the repo root (next to resume.tex) so the LaTeX workflow
 * doesn't change. This plugin serves it in dev and copies it into the build.
 */
function rootFiles(files: string[]): Plugin {
  return {
    name: 'root-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = decodeURIComponent((req.url ?? '').split('?')[0].replace(/^\//, ''));
        if (files.includes(name) && existsSync(resolve(name))) {
          res.setHeader('Content-Type', name.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream');
          res.end(readFileSync(resolve(name)));
          return;
        }
        next();
      });
    },
    generateBundle() {
      for (const name of files) {
        if (existsSync(resolve(name))) {
          this.emitFile({ type: 'asset', fileName: name, source: readFileSync(resolve(name)) });
        }
      }
    }
  };
}

export default defineConfig({
  // Relative base works on GitHub Pages project URLs and on a custom domain alike.
  base: './',
  plugins: [react(), tailwindcss(), rootFiles(['Resume.pdf'])],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          motion: ['motion', 'gsap', '@gsap/react']
        }
      }
    }
  }
});
