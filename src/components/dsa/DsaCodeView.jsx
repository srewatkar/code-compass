import CodeBlock from '../CodeBlock'

export default function DsaCodeView({ blocks }) {
  return (
    <div>
      {blocks.map(block => (
        <div key={block.id} style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
            {block.title}
          </h3>
          {block.note && (
            <p style={{
              fontSize: 14, color: '#475569', lineHeight: 1.65, marginBottom: 16,
              padding: '10px 14px', background: '#ede9fe',
              borderLeft: '3px solid #7c3aed', borderRadius: 4,
            }}>
              {block.note}
            </p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <CodeBlock language="javascript" code={block.js} />
            <CodeBlock language="python" code={block.python} />
          </div>
        </div>
      ))}
    </div>
  )
}
