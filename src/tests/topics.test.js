import { describe, it, expect } from 'vitest'
import { topics } from '../data/topics'

describe('topics data', () => {
  it('has at least one category', () => {
    expect(topics.length).toBeGreaterThan(0)
  })

  topics.forEach(cat => {
    describe(`category: ${cat.category}`, () => {
      it('has a non-empty category name', () => {
        expect(cat.category).toBeTruthy()
      })

      it('has at least one item', () => {
        expect(cat.items.length).toBeGreaterThan(0)
      })

      cat.items.forEach(item => {
        describe(`item: ${item.id}`, () => {
          it('has a unique non-empty id', () => {
            expect(item.id).toBeTruthy()
          })

          it('has a title', () => {
            expect(item.title).toBeTruthy()
          })

          it('has js code', () => {
            expect(item.js).toBeTruthy()
          })

          it('has python code', () => {
            expect(item.python).toBeTruthy()
          })
        })
      })
    })
  })
})
