import CodeBlock from './CodeBlock'
import './DetailPanel.css'

export default function DetailPanel({ topic }) {
  if (!topic) {
    return (
      <div className="detail-panel">
        <div className="detail-empty">← Select a topic from the sidebar</div>
      </div>
    )
  }

  return (
    <div className="detail-panel">
      <h2 className="detail-title">{topic.title}</h2>
      {topic.note && <p className="detail-note">{topic.note}</p>}
      <div className="detail-blocks">
        <CodeBlock language="javascript" code={topic.js} />
        <CodeBlock language="python" code={topic.python} />
      </div>
    </div>
  )
}
