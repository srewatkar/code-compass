import { useState } from 'react'
import './TracePanel.css'

export default function TracePanel({ jsCode, pyCode, currentLine, variables }) {
  const [lang, setLang] = useState('js')
  const code = lang === 'js' ? jsCode : pyCode
  const lines = code.split('\n')
  const hasVars = variables && Object.keys(variables).length > 0

  return (
    <div className="trace-panel">
      <div className="trace-lang-toggle">
        <button
          type="button"
          className={`trace-lang-btn${lang === 'js' ? ' active' : ''}`}
          onClick={() => setLang('js')}
        >
          JS
        </button>
        <button
          type="button"
          className={`trace-lang-btn${lang === 'python' ? ' active' : ''}`}
          onClick={() => setLang('python')}
        >
          Python
        </button>
      </div>

      <div className="trace-code">
        {lines.map((line, i) => (
          <div
            key={i}
            data-line={i}
            className={`trace-line${currentLine === i ? ' active' : ''}`}
          >
            {currentLine === i ? `→ ${line}` : `  ${line}`}
          </div>
        ))}
      </div>

      {hasVars && (
        <div className="trace-vars">
          <div className="trace-vars-label">Variables</div>
          {Object.entries(variables).map(([k, v]) => (
            <div key={k} className="trace-var-entry">
              <span className="trace-var-key">{k}</span>
              {' = '}
              <span className="trace-var-val">{JSON.stringify(v)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
