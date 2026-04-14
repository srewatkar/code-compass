# Code Compass

**Live site:** https://srewatkar.github.io/code-compass/

An interactive reference tool for developers learning JavaScript and Python side-by-side, with visual data structure simulators and algorithmic pattern guides.

## Sections

### Cheatsheet
Side-by-side JS vs Python syntax comparisons across 80+ topics: strings, arrays, objects, loops, functions, async, types, and more. Searchable by keyword.

### DSA (Data Structures & Algorithms)
Interactive simulators for core data structures with step-through visualization and code templates:
- **Stack** — push, pop, peek, clear
- **Queue** — enqueue, dequeue, peek, clear
- **Linked List** — append, prepend, delete, traverse, length, search, reverse
- **Binary Tree** — insert, search, inorder/preorder/postorder/level-order traversals
- **Sorting** — Bubble, Selection, Insertion sort with bar chart step-through

Each simulator has a **Simulate** tab (interactive, with live code trace panel) and a **Code** tab (JS + Python templates).

### Algo
18 common algorithmic patterns with step-through simulators, code templates, and live code tracing:

| Category | Patterns |
|---|---|
| Arrays & Strings | Sliding Window, Two Pointers, Fast & Slow Pointers, Prefix Sum, Monotonic Stack |
| Trees & Graphs | BFS Template, DFS Template, Backtracking, Topological Sort |
| Binary Search | Classic Binary Search, Binary Search on Answer |
| Dynamic Programming | 1D Memoization, 1D Tabulation, 2D DP |
| Other | Hash Map / Frequency, Merge Intervals, Heap / Priority Queue, Recursion |

Each pattern's Simulate tab shows a split view: the step-through visual on the left, and the currently executing line highlighted in the JS or Python template on the right, with a live variable state panel.

## Tech Stack

- **React 18** + Vite
- **highlight.js** for syntax highlighting
- **Vitest** + jsdom for tests (690 tests)
- No other runtime dependencies

## Running locally

```bash
npm install
npm run dev
```

Tests:
```bash
npm test
```
