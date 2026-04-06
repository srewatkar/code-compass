import { useEffect } from 'react'
import './Sidebar.css'

export default function Sidebar({ topics, selectedId, onSelect, searchQuery }) {
  const q = searchQuery.toLowerCase().trim()

  const filtered = topics
    .map(cat => ({
      ...cat,
      items: cat.items.filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          item.note?.toLowerCase().includes(q) ||
          item.js?.toLowerCase().includes(q) ||
          item.python?.toLowerCase().includes(q)
      ),
    }))
    .filter(cat => cat.items.length > 0)

  // Auto-select first result when search changes
  useEffect(() => {
    if (q && filtered.length > 0) {
      onSelect(filtered[0].items[0].id)
    }
  }, [q, onSelect])

  if (filtered.length === 0) {
    return (
      <div className="sidebar">
        <p className="sidebar-empty">No results for "{searchQuery}"</p>
      </div>
    )
  }

  return (
    <div className="sidebar">
      {filtered.map(cat => (
        <div key={cat.category} className="sidebar-category">
          <div className="sidebar-category-label">{cat.category}</div>
          {cat.items.map(item => (
            <button
              key={item.id}
              className={`sidebar-item${selectedId === item.id ? ' active' : ''}`}
              onClick={() => onSelect(item.id)}
              title={item.title}
            >
              {item.title}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
