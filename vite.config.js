import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Vite plugin — reads /public/images at build time and exposes the file list
 * as a virtual module. Components import it to get a live manifest without any
 * hardcoded paths. In dev mode the browser hot-reloads when images are added
 * or removed.
 */
function imageManifestPlugin() {
  const VIRTUAL_ID = 'virtual:image-manifest'
  const RESOLVED_ID = '\0' + VIRTUAL_ID

  function readManifest() {
    const dir = resolve('./public/images')
    try {
      return readdirSync(dir)
        .filter(f => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
        .map(f => ({ name: f, mtime: statSync(resolve(dir, f)).mtimeMs }))
        .sort((a, b) => b.mtime - a.mtime) // newest first
        .map(f => f.name)
    } catch {
      return []
    }
  }

  return {
    name: 'image-manifest',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return `export default ${JSON.stringify(readManifest())}`
      }
    },
    configureServer(server) {
      const dir = resolve('./public/images').replace(/\\/g, '/')
      server.watcher.add(dir)
      const reload = (file) => {
        if (file.replace(/\\/g, '/').startsWith(dir)) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
          if (mod) server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', reload)
      server.watcher.on('unlink', reload)
    },
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    imageManifestPlugin(),
  ],
  build: {
    // Raise warning threshold — Framer Motion + React Router are large but necessary
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk: stable libs that rarely change → better long-term caching
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
