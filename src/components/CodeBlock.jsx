import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github.css'
import './CodeBlock.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)

const LANG_CONFIG = {
  javascript: { label: 'JavaScript', color: '#b45309' },
  python: { label: 'Python', color: '#3572A5' },
}

export default function CodeBlock({ language, code }) {
  const codeRef = useRef(null)
  const { label, color } = LANG_CONFIG[language]

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute('data-highlighted')
      hljs.highlightElement(codeRef.current)
    }
  }, [code])

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="dot" style={{ background: color }} />
        <span style={{ color }}>{label}</span>
      </div>
      <pre>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}
