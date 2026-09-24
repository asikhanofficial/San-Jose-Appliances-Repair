import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

// Plugin to allow clean URLs in Vite dev server (e.g. /about -> /about.html)
function cleanUrlsPlugin(): Plugin {
  return {
    name: 'clean-urls-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && !req.url.includes('.')) {
          const urlPath = req.url.split('?')[0].replace(/^\//, '');
          const htmlFile = path.resolve(__dirname, `${urlPath}.html`);
          if (fs.existsSync(htmlFile)) {
            const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
            req.url = `/${urlPath}.html${query}`;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [cleanUrlsPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          serviceAreas: path.resolve(__dirname, 'service-areas.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          refrigeratorRepair: path.resolve(__dirname, 'refrigerator-repair.html'),
          dishwasherRepair: path.resolve(__dirname, 'dishwasher-repair.html'),
          washerRepair: path.resolve(__dirname, 'washer-repair.html'),
          dryerRepair: path.resolve(__dirname, 'dryer-repair.html'),
          ovenRepair: path.resolve(__dirname, 'oven-repair.html'),
          stoveRepair: path.resolve(__dirname, 'stove-repair.html'),
          rangeRepair: path.resolve(__dirname, 'range-repair.html'),
          freezerRepair: path.resolve(__dirname, 'freezer-repair.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
