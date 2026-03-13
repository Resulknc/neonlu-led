import { useEffect } from 'react'

/**
 * Sets document.title, meta description, Open Graph and Twitter Card tags
 * on mount / when values change. Restores previous values on unmount.
 *
 * @param {Object} params
 * @param {string} params.title          - Page <title> and og:title / twitter:title
 * @param {string} params.description    - meta description, og:description, twitter:description
 * @param {string} [params.canonical]    - Canonical URL (defaults to current href)
 * @param {string} [params.ogType]       - og:type (default: "website")
 * @param {string} [params.ogImage]      - og:image URL (optional)
 */
export default function useSEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage,
}) {
  useEffect(() => {
    // ── helpers ──────────────────────────────────────────────────────────────

    function getMeta(sel) {
      return document.querySelector(sel)
    }

    function setMeta(sel, attr, value, prevMap) {
      let el = getMeta(sel)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrValue] = sel.replace('meta[', '').replace(']', '').split('=')
        el.setAttribute(attrName, attrValue.replace(/"/g, ''))
        document.head.appendChild(el)
        prevMap[sel] = { created: true }
      } else {
        prevMap[sel] = { created: false, prev: el.getAttribute(attr) }
      }
      el.setAttribute(attr, value)
      return el
    }

    function setLink(rel, href, prevMap) {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
        prevMap[rel] = { created: true }
      } else {
        prevMap[rel] = { created: false, prev: el.getAttribute('href') }
      }
      el.setAttribute('href', href)
      return el
    }

    // ── snapshot previous document title ─────────────────────────────────────

    const prevTitle = document.title
    const prev = {}

    // ── apply ─────────────────────────────────────────────────────────────────

    document.title = title

    setMeta('meta[name="description"]',          'content', description, prev)
    setMeta('meta[property="og:title"]',         'content', title,       prev)
    setMeta('meta[property="og:description"]',   'content', description, prev)
    setMeta('meta[property="og:type"]',          'content', ogType,      prev)
    setMeta('meta[property="og:site_name"]',     'content', 'Neonlu LED', prev)
    setMeta('meta[name="twitter:card"]',         'content', 'summary',   prev)
    setMeta('meta[name="twitter:title"]',        'content', title,       prev)
    setMeta('meta[name="twitter:description"]',  'content', description, prev)

    if (ogImage) {
      setMeta('meta[property="og:image"]', 'content', ogImage, prev)
    }

    const canonicalHref = canonical ?? window.location.href
    setLink('canonical', canonicalHref, prev)

    // ── restore on unmount ────────────────────────────────────────────────────

    return () => {
      document.title = prevTitle

      Object.entries(prev).forEach(([sel, state]) => {
        // meta selectors contain '[', link entries are stored as the rel value (e.g. "canonical")
        const isLink = !sel.includes('[')
        const el = document.querySelector(isLink ? `link[rel="${sel}"]` : sel)
        if (!el) return
        if (state.created) {
          el.remove()
        } else {
          el.setAttribute(isLink ? 'href' : 'content', state.prev ?? '')
        }
      })
    }
  }, [title, description, canonical, ogType, ogImage])
}
