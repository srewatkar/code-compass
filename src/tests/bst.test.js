import { describe, it, expect } from 'vitest'

// Pure BST logic — extracted for testing
function insertBST(node, val) {
  if (!node) return { value: val, left: null, right: null }
  if (val < node.value) return { ...node, left: insertBST(node.left, val) }
  if (val > node.value) return { ...node, right: insertBST(node.right, val) }
  return node
}

function searchBST(node, val) {
  if (!node) return false
  if (node.value === val) return true
  if (val < node.value) return searchBST(node.left, val)
  return searchBST(node.right, val)
}

function inorderBST(node, result = []) {
  if (!node) return result
  inorderBST(node.left, result)
  result.push(node.value)
  inorderBST(node.right, result)
  return result
}

describe('BST logic', () => {
  it('inserts root when tree is empty', () => {
    const tree = insertBST(null, 5)
    expect(tree.value).toBe(5)
    expect(tree.left).toBeNull()
    expect(tree.right).toBeNull()
  })

  it('inserts smaller values to the left', () => {
    let tree = insertBST(null, 5)
    tree = insertBST(tree, 3)
    expect(tree.left.value).toBe(3)
    expect(tree.right).toBeNull()
  })

  it('inserts larger values to the right', () => {
    let tree = insertBST(null, 5)
    tree = insertBST(tree, 8)
    expect(tree.right.value).toBe(8)
    expect(tree.left).toBeNull()
  })

  it('ignores duplicates', () => {
    let tree = insertBST(null, 5)
    tree = insertBST(tree, 5)
    expect(tree.left).toBeNull()
    expect(tree.right).toBeNull()
  })

  it('searches correctly', () => {
    let tree = null
    for (const v of [5, 3, 8, 1, 4]) tree = insertBST(tree, v)
    expect(searchBST(tree, 4)).toBe(true)
    expect(searchBST(tree, 9)).toBe(false)
  })

  it('inorder traversal returns sorted values', () => {
    let tree = null
    for (const v of [5, 3, 8, 1, 4]) tree = insertBST(tree, v)
    expect(inorderBST(tree)).toEqual([1, 3, 4, 5, 8])
  })
})
