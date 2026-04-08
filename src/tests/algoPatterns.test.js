import { describe, it, expect } from 'vitest'
import { algoPatterns } from '../data/algoPatterns'

const EXPECTED_IDS = [
  'sliding-window','two-pointers','fast-slow-pointers','prefix-sum','monotonic-stack',
  'bfs','dfs','backtracking','topological-sort',
  'binary-search','binary-search-on-answer',
  'dp-1d-memo','dp-1d-tab','dp-2d',
  'hashmap','merge-intervals','heap',
]

describe('algoPatterns data', () => {
  it('has 5 categories', () => {
    expect(algoPatterns.length).toBe(5)
  })

  it('has 18 total patterns', () => {
    const total = algoPatterns.reduce((sum, cat) => sum + cat.patterns.length, 0)
    expect(total).toBe(18)
  })

  it('has all expected pattern IDs', () => {
    const ids = algoPatterns.flatMap(cat => cat.patterns.map(p => p.id))
    EXPECTED_IDS.forEach(id => expect(ids).toContain(id))
  })

  it('has no duplicate pattern IDs', () => {
    const ids = algoPatterns.flatMap(cat => cat.patterns.map(p => p.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  algoPatterns.forEach(cat => {
    describe(`category: ${cat.id}`, () => {
      it('has id and label', () => {
        expect(cat.id).toBeTruthy()
        expect(cat.label).toBeTruthy()
      })

      if (cat.id === 'other') {
        it('has 4 patterns in other category', () => {
          expect(cat.patterns.length).toBe(4)
        })
      }

      cat.patterns.forEach(pattern => {
        describe(`pattern: ${pattern.id}`, () => {
          it('has title', () => expect(pattern.title).toBeTruthy())
          it('has whenToUse', () => expect(pattern.whenToUse).toBeTruthy())
          it('has at least one code block', () => expect(pattern.codeBlocks.length).toBeGreaterThan(0))
          pattern.codeBlocks.forEach(block => {
            describe(`block: ${block.id}`, () => {
              it('has js code', () => expect(block.js).toBeTruthy())
              it('has python code', () => expect(block.python).toBeTruthy())
              it('has title', () => expect(block.title).toBeTruthy())
            })
          })
        })
      })
    })
  })
})
