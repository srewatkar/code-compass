import './TopNav.css'

export default function TopNav({ mode, setMode }) {
  return (
    <nav className="top-nav">
      <button
        className={`top-nav-btn${mode === 'cheatsheet' ? ' active' : ''}`}
        onClick={() => setMode('cheatsheet')}
      >
        Cheatsheet
      </button>
      <button
        className={`top-nav-btn${mode === 'dsa' ? ' active' : ''}`}
        onClick={() => setMode('dsa')}
      >
        DSA
      </button>
      <button className="top-nav-btn" disabled>
        Algo <span className="coming-soon">coming soon</span>
      </button>
    </nav>
  )
}
