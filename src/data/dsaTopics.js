export const dsaTopics = {
  stack: [
    {
      id: 'stack-create',
      title: 'Create a stack',
      note: 'JS uses a plain array as a stack. Python also uses a list, or collections.deque for thread-safe operations.',
      js: `// JS — use a plain array
const stack = []`,
      python: `# Python — use a list
stack = []

# Or for thread-safe operations:
from collections import deque
stack = deque()`,
    },
    {
      id: 'stack-push',
      title: 'Push — add to top',
      note: 'JS: push(). Python: append(). Both add to the end which is the "top" of the stack.',
      js: `stack.push(1)
stack.push(2)
stack.push(3)
// stack is now [1, 2, 3] — 3 is on top`,
      python: `stack.append(1)
stack.append(2)
stack.append(3)
# stack is now [1, 2, 3] — 3 is on top`,
    },
    {
      id: 'stack-pop',
      title: 'Pop — remove from top',
      note: 'JS: pop() removes and returns the last element. Python: same. Both are O(1).',
      js: `stack.pop()  // returns 3, stack is [1, 2]
stack.pop()  // returns 2, stack is [1]`,
      python: `stack.pop()  # returns 3, stack is [1, 2]
stack.pop()  # returns 2, stack is [1]`,
    },
    {
      id: 'stack-peek',
      title: 'Peek — view top without removing',
      note: 'Neither language has a built-in peek method. Access the last element directly.',
      js: `const top = stack[stack.length - 1]  // view top
// stack unchanged`,
      python: `top = stack[-1]  # view top — Python negative indexing!
# stack unchanged`,
    },
    {
      id: 'stack-isempty',
      title: 'Check if empty',
      note: 'JS: check .length === 0. Python: check len() === 0, or use truthiness.',
      js: `stack.length === 0   // true if empty

if (stack.length === 0) {
  console.log('empty')
}`,
      python: `len(stack) == 0  # True if empty

if not stack:    # Pythonic — empty list is falsy
    print('empty')`,
    },
    {
      id: 'stack-size',
      title: 'Get size',
      note: 'JS: .length property. Python: len() built-in.',
      js: `stack.length  // number of items`,
      python: `len(stack)  # number of items`,
    },
    {
      id: 'stack-deque-all',
      title: 'Python deque — full stack operations',
      note: 'deque is double-ended. As a stack use append() + pop() (right side). appendleft()/popleft() operate on the left/front instead.',
      js: `// JS array covers all of these natively
const stack = []
stack.push(1)             // append right
stack.pop()               // remove right (stack pop)
stack.unshift(1)          // append left
stack.shift()             // remove left
stack[stack.length - 1]   // peek right
stack[0]                  // peek left`,
      python: `from collections import deque
stack = deque()

stack.append(1)     # push to right (top)
stack.pop()         # pop from right (top) ← use for stack
stack.appendleft(1) # push to left (front)
stack.popleft()     # pop from left ← use for queue
stack[-1]           # peek right (top)
stack[0]            # peek left (front)
len(stack)          # size
bool(stack)         # False if empty`,
    },
  ],

  queue: [
    {
      id: 'queue-create',
      title: 'Create a queue',
      note: 'JS uses a plain array. Python recommends collections.deque for O(1) dequeue — plain list dequeue is O(n).',
      js: `// JS — use a plain array
const queue = []`,
      python: `# Python — use deque for O(1) operations
from collections import deque
queue = deque()

# Plain list works but dequeue (pop(0)) is O(n):
queue = []`,
    },
    {
      id: 'queue-enqueue',
      title: 'Enqueue — add to back',
      note: 'Add to the end of the queue. JS: push(). Python: append().',
      js: `queue.push(1)
queue.push(2)
queue.push(3)
// queue: [1, 2, 3] — 1 is at front`,
      python: `queue.append(1)
queue.append(2)
queue.append(3)
# queue: deque([1, 2, 3]) — 1 is at front`,
    },
    {
      id: 'queue-dequeue',
      title: 'Dequeue — remove from front',
      note: 'JS: shift() removes from the front — O(n). Python: popleft() on deque is O(1).',
      js: `queue.shift()  // returns 1 — O(n) ⚠️
// queue: [2, 3]`,
      python: `queue.popleft()  # returns 1 — O(1) ✅
# queue: deque([2, 3])

# Plain list (avoid for large queues):
queue.pop(0)  # O(n) ⚠️`,
    },
    {
      id: 'queue-peek',
      title: 'Peek — view front without removing',
      note: 'Access the first element without removing it.',
      js: `const front = queue[0]  // view front
// queue unchanged`,
      python: `front = queue[0]  # view front
# queue unchanged`,
    },
    {
      id: 'queue-isempty',
      title: 'Check if empty',
      note: 'Same pattern as stack.',
      js: `queue.length === 0

if (queue.length === 0) {
  console.log('empty')
}`,
      python: `len(queue) == 0

if not queue:    # empty deque is also falsy
    print('empty')`,
    },
    {
      id: 'queue-size',
      title: 'Get size',
      note: 'JS: .length. Python: len().',
      js: `queue.length  // number of items`,
      python: `len(queue)  # number of items`,
    },
    {
      id: 'queue-peek-back',
      title: 'Peek — view back without removing',
      note: 'The back is the most recently added item.',
      js: `const back = queue[queue.length - 1]`,
      python: `back = queue[-1]  # deque supports negative indexing`,
    },
    {
      id: 'queue-deque-extras',
      title: 'Python deque — extras (maxlen, rotate)',
      note: 'deque supports bounded size via maxlen, and rotation. These have no built-in JS equivalent.',
      js: `// JS: no built-in bounded queue or rotate
// Simulate maxlen manually:
const MAX = 3
queue.push(4)
if (queue.length > MAX) queue.shift()

// Simulate rotate:
// rotate right by 1:
queue.unshift(queue.pop())
// rotate left by 1:
queue.push(queue.shift())`,
      python: `from collections import deque

# Bounded queue — oldest item auto-dropped when full
q = deque(maxlen=3)
q.append(1); q.append(2); q.append(3)
q.append(4)  # deque([2, 3, 4]) — 1 was dropped

# Rotate — positive = right, negative = left
q = deque([1, 2, 3, 4, 5])
q.rotate(2)   # deque([4, 5, 1, 2, 3])
q.rotate(-1)  # deque([5, 1, 2, 3, 4])`,
    },
  ],

  linkedlist: [
    {
      id: 'll-node',
      title: 'Node class',
      note: 'A linked list node holds a value and a reference to the next node.',
      js: `class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None`,
    },
    {
      id: 'll-create',
      title: 'Create a linked list',
      note: 'A linked list tracks the head node. Traversal always starts from head.',
      js: `class LinkedList {
  constructor() {
    this.head = null
  }
}
const list = new LinkedList()`,
      python: `class LinkedList:
    def __init__(self):
        self.head = None

lst = LinkedList()`,
    },
    {
      id: 'll-append',
      title: 'Append — add to end',
      note: 'Traverse to the last node, then set its next to a new node. O(n).',
      js: `append(value) {
  const node = new Node(value)
  if (!this.head) { this.head = node; return }
  let curr = this.head
  while (curr.next) curr = curr.next
  curr.next = node
}`,
      python: `def append(self, value):
    node = Node(value)
    if not self.head:
        self.head = node
        return
    curr = self.head
    while curr.next:
        curr = curr.next
    curr.next = node`,
    },
    {
      id: 'll-prepend',
      title: 'Prepend — add to front',
      note: "Point new node's next to current head, then update head. O(1).",
      js: `prepend(value) {
  const node = new Node(value)
  node.next = this.head
  this.head = node
}`,
      python: `def prepend(self, value):
    node = Node(value)
    node.next = self.head
    self.head = node`,
    },
    {
      id: 'll-delete',
      title: 'Delete by value',
      note: 'Find the node before the target, then skip over the target node.',
      js: `delete(value) {
  if (!this.head) return
  if (this.head.value === value) {
    this.head = this.head.next; return
  }
  let curr = this.head
  while (curr.next && curr.next.value !== value) {
    curr = curr.next
  }
  if (curr.next) curr.next = curr.next.next
}`,
      python: `def delete(self, value):
    if not self.head:
        return
    if self.head.value == value:
        self.head = self.head.next
        return
    curr = self.head
    while curr.next and curr.next.value != value:
        curr = curr.next
    if curr.next:
        curr.next = curr.next.next`,
    },
    {
      id: 'll-traverse',
      title: 'Traverse — print all nodes',
      note: 'Walk from head to tail, collecting values.',
      js: `traverse() {
  const result = []
  let curr = this.head
  while (curr) {
    result.push(curr.value)
    curr = curr.next
  }
  return result  // e.g. [1, 2, 3]
}`,
      python: `def traverse(self):
    result = []
    curr = self.head
    while curr:
        result.append(curr.value)
        curr = curr.next
    return result  # e.g. [1, 2, 3]`,
    },
    {
      id: 'll-length',
      title: 'Get length',
      note: 'Count nodes by walking the list. O(n). Keep a size counter on the class to make this O(1).',
      js: `length() {
  let count = 0
  let curr = this.head
  while (curr) {
    count++
    curr = curr.next
  }
  return count
}`,
      python: `def length(self):
    count = 0
    curr = self.head
    while curr:
        count += 1
        curr = curr.next
    return count`,
    },
    {
      id: 'll-search',
      title: 'Search — find a value',
      note: 'Walk from head, return the node (or index) when the value matches. O(n).',
      js: `search(value) {
  let curr = this.head
  let index = 0
  while (curr) {
    if (curr.value === value) return index
    curr = curr.next
    index++
  }
  return -1  // not found
}`,
      python: `def search(self, value):
    curr = self.head
    index = 0
    while curr:
        if curr.value == value:
            return index
        curr = curr.next
        index += 1
    return -1  # not found`,
    },
    {
      id: 'll-reverse',
      title: 'Reverse the list',
      note: 'Walk the list, reversing each next pointer. O(n) time, O(1) space.',
      js: `reverse() {
  let prev = null
  let curr = this.head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  this.head = prev
}`,
      python: `def reverse(self):
    prev = None
    curr = self.head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    self.head = prev`,
    },
  ],

  binarytree: [
    {
      id: 'bst-node',
      title: 'Node class',
      note: 'A BST node has a value, left child (smaller values) and right child (larger values).',
      js: `class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}`,
      python: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None`,
    },
    {
      id: 'bst-insert',
      title: 'Insert',
      note: 'Smaller values go left, larger go right. Duplicates are ignored.',
      js: `function insert(node, value) {
  if (!node) return new TreeNode(value)
  if (value < node.value) node.left = insert(node.left, value)
  else if (value > node.value) node.right = insert(node.right, value)
  return node
}`,
      python: `def insert(node, value):
    if not node:
        return TreeNode(value)
    if value < node.value:
        node.left = insert(node.left, value)
    elif value > node.value:
        node.right = insert(node.right, value)
    return node`,
    },
    {
      id: 'bst-search',
      title: 'Search',
      note: 'At each node, go left if smaller, right if larger. O(log n) average.',
      js: `function search(node, value) {
  if (!node) return false
  if (node.value === value) return true
  if (value < node.value) return search(node.left, value)
  return search(node.right, value)
}`,
      python: `def search(node, value):
    if not node:
        return False
    if node.value == value:
        return True
    if value < node.value:
        return search(node.left, value)
    return search(node.right, value)`,
    },
    {
      id: 'bst-inorder',
      title: 'Inorder traversal — Left → Root → Right',
      note: 'Visits nodes in sorted order. Use this to get a sorted array from a BST.',
      js: `function inorder(node, result = []) {
  if (!node) return result
  inorder(node.left, result)
  result.push(node.value)
  inorder(node.right, result)
  return result
}
// inorder(root) → [1, 3, 4, 5, 8]  (sorted!)`,
      python: `def inorder(node, result=None):
    if result is None:
        result = []
    if not node:
        return result
    inorder(node.left, result)
    result.append(node.value)
    inorder(node.right, result)
    return result
# inorder(root) → [1, 3, 4, 5, 8]  (sorted!)`,
    },
    {
      id: 'bst-preorder',
      title: 'Preorder traversal — Root → Left → Right',
      note: 'Visits root before children. Use this to copy or serialize a tree.',
      js: `function preorder(node, result = []) {
  if (!node) return result
  result.push(node.value)
  preorder(node.left, result)
  preorder(node.right, result)
  return result
}
// preorder(root) → [5, 3, 1, 4, 8]`,
      python: `def preorder(node, result=None):
    if result is None:
        result = []
    if not node:
        return result
    result.append(node.value)
    preorder(node.left, result)
    preorder(node.right, result)
    return result
# preorder(root) → [5, 3, 1, 4, 8]`,
    },
    {
      id: 'bst-postorder',
      title: 'Postorder traversal — Left → Right → Root',
      note: 'Visits children before root. Use this to delete a tree or evaluate expression trees.',
      js: `function postorder(node, result = []) {
  if (!node) return result
  postorder(node.left, result)
  postorder(node.right, result)
  result.push(node.value)
  return result
}
// postorder(root) → [1, 4, 3, 8, 5]`,
      python: `def postorder(node, result=None):
    if result is None:
        result = []
    if not node:
        return result
    postorder(node.left, result)
    postorder(node.right, result)
    result.append(node.value)
    return result
# postorder(root) → [1, 4, 3, 8, 5]`,
    },
    {
      id: 'bst-levelorder',
      title: 'Level-order traversal (BFS)',
      note: 'Visit nodes level by level using a queue. JS: use an array as a queue. Python: use collections.deque for O(1) popleft.',
      js: `function levelOrder(root) {
  if (!root) return []
  const result = []
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()  // dequeue front
    result.push(node.value)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
  return result
}
// levelOrder(root) → [5, 3, 8, 1, 4]`,
      python: `from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.value)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result
# level_order(root) → [5, 3, 8, 1, 4]`,
    },
    {
      id: 'bst-height',
      title: 'Get height / depth',
      note: 'Height = longest path from root to a leaf. An empty tree has height 0.',
      js: `function height(node) {
  if (!node) return 0
  return 1 + Math.max(height(node.left), height(node.right))
}
// height(root) → 3`,
      python: `def height(node):
    if not node:
        return 0
    return 1 + max(height(node.left), height(node.right))
# height(root) → 3`,
    },
    {
      id: 'bst-minmax',
      title: 'Find min and max',
      note: 'In a BST, the minimum is always the leftmost node and the maximum is the rightmost.',
      js: `function findMin(node) {
  while (node.left) node = node.left
  return node.value
}

function findMax(node) {
  while (node.right) node = node.right
  return node.value
}`,
      python: `def find_min(node):
    while node.left:
        node = node.left
    return node.value

def find_max(node):
    while node.right:
        node = node.right
    return node.value`,
    },
    {
      id: 'bst-count',
      title: 'Count nodes',
      note: 'Recursively count every node in the tree.',
      js: `function countNodes(node) {
  if (!node) return 0
  return 1 + countNodes(node.left) + countNodes(node.right)
}`,
      python: `def count_nodes(node):
    if not node:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)`,
    },
  ],

  sorting: [
    {
      id: 'sort-bubble',
      title: 'Bubble Sort',
      note: 'Repeatedly swap adjacent elements if they are in the wrong order. O(n²). Simple but slow.',
      js: `function bubbleSort(arr) {
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]
      }
    }
  }
  return a
}`,
      python: `def bubble_sort(arr):
    a = arr[:]
    n = len(a)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a`,
    },
    {
      id: 'sort-selection',
      title: 'Selection Sort',
      note: 'Find the minimum in the unsorted portion, swap it to the front. O(n²). Fewer swaps than bubble sort.',
      js: `function selectionSort(arr) {
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]]
  }
  return a
}`,
      python: `def selection_sort(arr):
    a = arr[:]
    n = len(a)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if a[j] < a[min_idx]:
                min_idx = j
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
    return a`,
    },
    {
      id: 'sort-insertion',
      title: 'Insertion Sort',
      note: 'Build the sorted array one element at a time by inserting each into its correct position. O(n²) worst, O(n) best (nearly sorted).',
      js: `function insertionSort(arr) {
  const a = [...arr]
  for (let i = 1; i < a.length; i++) {
    const key = a[i]
    let j = i - 1
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j]
      j--
    }
    a[j + 1] = key
  }
  return a
}`,
      python: `def insertion_sort(arr):
    a = arr[:]
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a`,
    },
  ],
}
