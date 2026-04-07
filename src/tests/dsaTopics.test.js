import { describe, it, expect } from 'vitest'
import { dsaTopics } from '../data/dsaTopics'

describe('dsaTopics data', () => {
  const sections = Object.keys(dsaTopics)

  it('has all 5 sections', () => {
    expect(sections).toContain('stack')
    expect(sections).toContain('queue')
    expect(sections).toContain('linkedlist')
    expect(sections).toContain('binarytree')
    expect(sections).toContain('sorting')
  })

  it('has no duplicate IDs across all sections', () => {
    const ids = sections.flatMap(s => dsaTopics[s].map(b => b.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  sections.forEach(section => {
    describe(`section: ${section}`, () => {
      it('has at least one block', () => {
        expect(dsaTopics[section].length).toBeGreaterThan(0)
      })

      dsaTopics[section].forEach(block => {
        describe(`block: ${block.id}`, () => {
          it('has id', () => expect(block.id).toBeTruthy())
          it('has title', () => expect(block.title).toBeTruthy())
          it('has js code', () => expect(block.js).toBeTruthy())
          it('has python code', () => expect(block.python).toBeTruthy())
        })
      })
    })
  })
})
