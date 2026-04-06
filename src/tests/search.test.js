import { describe, it, expect } from 'vitest'

// Replicate the exact filter logic from Sidebar.jsx
function filterTopics(topics, searchQuery) {
  const q = searchQuery.toLowerCase().trim()
  if (!q) return topics
  return topics
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
}

const sampleTopics = [
  {
    category: 'Basics',
    items: [
      { id: 'variables', title: 'Variables', note: 'let const', js: 'let x = 1', python: 'x = 1' },
      { id: 'comments', title: 'Comments', note: 'inline', js: '// comment', python: '# comment' },
    ],
  },
  {
    category: 'Loops',
    items: [
      { id: 'for-loop', title: 'Basic for loop', note: 'iteration', js: 'for (let i=0;i<5;i++)', python: 'for i in range(5)' },
    ],
  },
]

describe('filterTopics', () => {
  it('returns all topics when query is empty', () => {
    expect(filterTopics(sampleTopics, '')).toEqual(sampleTopics)
  })

  it('filters by title', () => {
    const result = filterTopics(sampleTopics, 'comments')
    expect(result[0].items).toHaveLength(1)
    expect(result[0].items[0].id).toBe('comments')
  })

  it('filters by js code content', () => {
    const result = filterTopics(sampleTopics, 'range')
    expect(result[0].category).toBe('Loops')
  })

  it('returns empty array when nothing matches', () => {
    const result = filterTopics(sampleTopics, 'zzznomatch')
    expect(result).toHaveLength(0)
  })

  it('is case insensitive', () => {
    const result = filterTopics(sampleTopics, 'VARIABLES')
    expect(result[0].items[0].id).toBe('variables')
  })
})
