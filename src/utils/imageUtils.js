/**
 * imageUtils — dynamic image manifest helpers
 *
 * The manifest is built at dev/build time by the `imageManifestPlugin` in
 * vite.config.js. It reads every file in /public/images/ and sorts them
 * newest-first by modification time. Adding a photo to that folder and
 * restarting dev-server (or rebuilding) is all that's needed to surface it
 * on the site.
 *
 * Naming convention expected:
 *   {slug}-{n}.{ext}   e.g.  dugun-neon-tabelasi-1.jpeg
 *
 * slug must match a product slug in products.js for full metadata to appear.
 * Unknown slugs show a generic card with the slug as the title.
 */

import rawFiles from 'virtual:image-manifest'

// ── Helpers ────────────────────────────────────────────────────────────────

/** "dugun-neon-tabelasi-1.jpeg" → { slug, n, src } or null */
function parseImageFile(filename) {
  const match = filename.match(/^(.+?)-(\d+)\.(jpe?g|png|webp|gif|avif)$/i)
  if (!match) return null
  return {
    slug: match[1],
    n: parseInt(match[2], 10),
    filename,
    src: `/images/${filename}`,
  }
}

// ── Exports ────────────────────────────────────────────────────────────────

/**
 * All parsed images from /public/images, sorted newest-first then by n.
 * Already filtered to valid filenames.
 */
export const allImages = rawFiles
  .map(parseImageFile)
  .filter(Boolean)

/**
 * Images grouped by slug.
 * { 'is-yeri-neon-tabelasi': [{ slug, n, src }, ...], ... }
 */
export const imagesBySlug = allImages.reduce((acc, img) => {
  if (!acc[img.slug]) acc[img.slug] = []
  acc[img.slug].push(img)
  return acc
}, {})

/**
 * Get gallery-ready images for a product slug.
 * Returns [{ src, alt }, ...] sorted by n.
 *
 * @param {string} slug   - product slug
 * @param {string} altBase - prefix for alt tags  (e.g. product title)
 */
export function getImagesForSlug(slug, altBase = '') {
  const imgs = (imagesBySlug[slug] ?? []).slice().sort((a, b) => a.n - b.n)
  return imgs.map((img, i) => ({
    src: img.src,
    alt: altBase
      ? `${altBase.toLowerCase()} neon tabela tasarım örneği ${i + 1}`
      : `${img.slug.replace(/-/g, ' ')} tabela örneği`,
  }))
}
