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
      title: 'Inorder traversal (sorted)',
      note: 'Left → Root → Right. Inorder traversal of a BST gives values in sorted order.',
      js: `function inorder(node, result = []) {
  if (!node) return result
  inorder(node.left, result)
  result.push(node.value)
  inorder(node.right, result)
  return result
}`,
      python: `def inorder(node, result=None):
    if result is None:
        result = []
    if not node:
        return result
    inorder(node.left, result)
    result.append(node.value)
    inorder(node.right, result)
    return result`,
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
