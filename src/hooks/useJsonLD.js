import { useEffect } from 'react'

/**
 * Injects a JSON-LD <script> tag into <head> on mount, removes it on unmount.
 * @param {Object|Object[]} schema - Schema.org JSON-LD object(s)
 */
export default function useJsonLD(schema) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    script.setAttribute('data-jsonld', 'true')
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [JSON.stringify(schema)]) // eslint-disable-line react-hooks/exhaustive-deps
}
