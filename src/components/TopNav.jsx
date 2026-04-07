import './TopNav.css'

export default function TopNav({ mode, onModeChange }) {
  return (
    <nav className="top-nav">
      <button
        type="button"
        className={`top-nav-btn${mode === 'cheatsheet' ? ' active' : ''}`}
        onClick={() => onModeChange('cheatsheet')}
      >
        Cheatsheet
      </button>
      <button
        type="button"
        className={`top-nav-btn${mode === 'dsa' ? ' active' : ''}`}
        onClick={() => onModeChange('dsa')}
      >
        DSA
      </button>
      <button type="button" className="top-nav-btn" disabled>
        Algo <span className="coming-soon">coming soon</span>
      </button>
    </nav>
  )
}
