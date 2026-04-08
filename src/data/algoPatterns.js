export const algoPatterns = [
  {
    id: 'arrays',
    label: 'Arrays & Strings',
    patterns: [
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        whenToUse:
          'Use when you need to find a subarray or substring that satisfies a constraint (max sum, longest without repeats, etc.). The window expands and contracts to avoid re-scanning elements.',
        codeBlocks: [
          {
            id: 'sliding-window-fixed',
            title: 'Fixed-size window — max sum subarray of size k',
            note: 'Maintain a running sum; slide by subtracting the element leaving and adding the element entering.',
            js: `function maxSumSubarray(nums, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];

  let maxSum = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}

// Example
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9`,
            python: `def max_sum_subarray(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum

    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

# Example
print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))  # 9`,
          },
          {
            id: 'sliding-window-variable',
            title: 'Variable-size window — longest substring without repeating characters',
            note: 'Expand the right pointer; shrink the left pointer whenever a duplicate enters the window.',
            js: `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1;
    }
    seen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3`,
            python: `def length_of_longest_substring(s):
    seen = {}
    left = 0
    max_len = 0

    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1
        seen[ch] = right
        max_len = max(max_len, right - left + 1)

    return max_len

print(length_of_longest_substring("abcabcbb"))  # 3`,
          },
        ],
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers',
        whenToUse:
          'Use on sorted arrays (or after sorting) when you need pairs or subarrays that satisfy a condition. Move pointers toward each other (opposite ends) or in the same direction to skip duplicates.',
        codeBlocks: [
          {
            id: 'two-pointers-opposite',
            title: 'Opposite ends — two sum on sorted array',
            note: 'Left pointer starts at 0, right at end. Move them inward based on the current sum.',
            js: `function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}

console.log(twoSumSorted([1, 2, 3, 4, 6], 6)); // [1, 3]`,
            python: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1

    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1

    return [-1, -1]

print(two_sum_sorted([1, 2, 3, 4, 6], 6))  # [1, 3]`,
          },
          {
            id: 'two-pointers-same-dir',
            title: 'Same direction — remove duplicates in-place',
            note: 'Slow pointer marks the write position; fast pointer scans ahead to find unique values.',
            js: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}

const arr = [1, 1, 2, 3, 3, 4];
console.log(removeDuplicates(arr)); // 4 (unique count)`,
            python: `def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0

    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]

    return slow + 1

arr = [1, 1, 2, 3, 3, 4]
print(remove_duplicates(arr))  # 4`,
          },
        ],
      },
      {
        id: 'fast-slow-pointers',
        title: 'Fast & Slow Pointers',
        whenToUse:
          "Use on linked lists (or cyclic structures) to detect cycles or find the midpoint. The fast pointer moves twice as fast as the slow pointer — when they meet, a cycle exists.",
        codeBlocks: [
          {
            id: 'fast-slow-cycle',
            title: "Cycle detection — Floyd's algorithm",
            note: 'If fast and slow meet, a cycle exists. To find the cycle start, reset one pointer to head and advance both one step at a time.',
            js: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// Build list with cycle: 1 -> 2 -> 3 -> 4 -> 2 (cycle)
const n1 = new ListNode(1);
const n2 = new ListNode(2);
const n3 = new ListNode(3);
const n4 = new ListNode(4);
n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2;
console.log(hasCycle(n1)); // true`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True

    return False

# Build list with cycle
n1, n2, n3, n4 = ListNode(1), ListNode(2), ListNode(3), ListNode(4)
n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2
print(has_cycle(n1))  # True`,
          },
          {
            id: 'fast-slow-middle',
            title: 'Find middle of linked list',
            note: 'When fast reaches the end, slow is at the midpoint. For even-length lists, slow lands on the second middle node.',
            js: `function findMiddle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // middle node
}

// Build list: 1 -> 2 -> 3 -> 4 -> 5
const nodes = [1,2,3,4,5].map(v => new ListNode(v));
nodes.forEach((n, i) => { if (i < nodes.length - 1) n.next = nodes[i+1]; });
console.log(findMiddle(nodes[0]).val); // 3`,
            python: `def find_middle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow  # middle node

nodes = [ListNode(i) for i in range(1, 6)]
for i in range(len(nodes) - 1):
    nodes[i].next = nodes[i + 1]
print(find_middle(nodes[0]).val)  # 3`,
          },
        ],
      },
      {
        id: 'prefix-sum',
        title: 'Prefix Sum',
        whenToUse:
          'Use when you need multiple range sum queries on a static array. Build the prefix array in O(n) once; then answer each query in O(1).',
        codeBlocks: [
          {
            id: 'prefix-sum-build',
            title: 'Build prefix array + range sum query',
            note: 'prefix[i] = sum of nums[0..i-1]. Range sum [l, r] = prefix[r+1] - prefix[l].',
            js: `function buildPrefix(nums) {
  const prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }
  return prefix;
}

function rangeSum(prefix, l, r) {
  return prefix[r + 1] - prefix[l];
}

const nums = [1, 2, 3, 4, 5];
const prefix = buildPrefix(nums);
console.log(rangeSum(prefix, 1, 3)); // 9  (2+3+4)
console.log(rangeSum(prefix, 0, 4)); // 15`,
            python: `def build_prefix(nums):
    prefix = [0] * (len(nums) + 1)
    for i, v in enumerate(nums):
        prefix[i + 1] = prefix[i] + v
    return prefix

def range_sum(prefix, l, r):
    return prefix[r + 1] - prefix[l]

nums = [1, 2, 3, 4, 5]
prefix = build_prefix(nums)
print(range_sum(prefix, 1, 3))  # 9
print(range_sum(prefix, 0, 4))  # 15`,
          },
        ],
      },
      {
        id: 'monotonic-stack',
        title: 'Monotonic Stack',
        whenToUse:
          'Use when you need the next (or previous) greater/smaller element for each index. Maintain a stack in monotonically increasing or decreasing order; pop when the invariant breaks.',
        codeBlocks: [
          {
            id: 'monotonic-stack-nge',
            title: 'Next greater element',
            note: 'Maintain a decreasing stack of indices. When a larger element is found, it is the answer for everything popped.',
            js: `function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // stores indices

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}

console.log(nextGreaterElement([2, 1, 2, 4, 3]));
// [4, 2, 4, -1, -1]`,
            python: `def next_greater_element(nums):
    result = [-1] * len(nums)
    stack = []  # stores indices

    for i, val in enumerate(nums):
        while stack and val > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = val
        stack.append(i)

    return result

print(next_greater_element([2, 1, 2, 4, 3]))
# [4, 2, 4, -1, -1]`,
          },
        ],
      },
    ],
  },
  {
    id: 'trees',
    label: 'Trees & Graphs',
    patterns: [
      {
        id: 'bfs',
        title: 'BFS Template',
        whenToUse:
          'Use BFS to find the shortest path in an unweighted graph or grid, or when you need to process nodes level by level. A queue ensures you explore neighbors before going deeper.',
        codeBlocks: [
          {
            id: 'bfs-grid',
            title: 'Shortest path in grid',
            note: 'Start from source cell, explore 4 directions, track visited to avoid revisiting. Returns -1 if destination is unreachable.',
            js: `function shortestPath(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const [sr, sc] = start;
  const [er, ec] = end;
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const queue = [[sr, sc, 0]]; // [row, col, distance]
  visited[sr][sc] = true;

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();
    if (r === er && c === ec) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
          && !visited[nr][nc] && grid[nr][nc] === 0) {
        visited[nr][nc] = true;
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}

const grid = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 0, 0],
];
console.log(shortestPath(grid, [0,0], [2,2])); // 4`,
            python: `from collections import deque

def shortest_path(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    sr, sc = start
    er, ec = end
    dirs = [(0,1),(0,-1),(1,0),(-1,0)]

    visited = [[False]*cols for _ in range(rows)]
    queue = deque([(sr, sc, 0)])
    visited[sr][sc] = True

    while queue:
        r, c, dist = queue.popleft()
        if r == er and c == ec:
            return dist

        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] and grid[nr][nc] == 0:
                visited[nr][nc] = True
                queue.append((nr, nc, dist + 1))

    return -1

grid = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0],
]
print(shortest_path(grid, (0,0), (2,2)))  # 4`,
          },
        ],
      },
      {
        id: 'dfs',
        title: 'DFS Template',
        whenToUse:
          'Use DFS for exhaustive exploration, connected components, cycle detection, or problems that require going deep before backtracking. Works on both trees and general graphs.',
        codeBlocks: [
          {
            id: 'dfs-recursive',
            title: 'Recursive graph DFS',
            note: 'Track a visited set to handle cycles. Recursion implicitly uses the call stack.',
            js: `function dfsRecursive(graph, start) {
  const visited = new Set();
  const order = [];

  function dfs(node) {
    visited.add(node);
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }

  dfs(start);
  return order;
}

const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1],
};
console.log(dfsRecursive(graph, 0)); // [0, 1, 3, 2]`,
            python: `def dfs_recursive(graph, start):
    visited = set()
    order = []

    def dfs(node):
        visited.add(node)
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)

    dfs(start)
    return order

graph = {0: [1, 2], 1: [0, 3], 2: [0], 3: [1]}
print(dfs_recursive(graph, 0))  # [0, 1, 3, 2]`,
          },
          {
            id: 'dfs-iterative',
            title: 'Iterative graph DFS',
            note: 'Use an explicit stack instead of recursion. Pop from the stack, mark visited, push unvisited neighbors.',
            js: `function dfsIterative(graph, start) {
  const visited = new Set();
  const order = [];
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
  return order;
}

const graph = {0: [1, 2], 1: [0, 3], 2: [0], 3: [1]};
console.log(dfsIterative(graph, 0)); // [0, 2, 1, 3]`,
            python: `def dfs_iterative(graph, start):
    visited = set()
    order = []
    stack = [start]

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                stack.append(neighbor)

    return order

graph = {0: [1, 2], 1: [0, 3], 2: [0], 3: [1]}
print(dfs_iterative(graph, 0))  # [0, 2, 1, 3]`,
          },
        ],
      },
      {
        id: 'backtracking',
        title: 'Backtracking',
        whenToUse:
          'Use backtracking when you need to explore all possible combinations, permutations, or subsets and prune invalid branches early. The key is "choose → explore → unchoose".',
        codeBlocks: [
          {
            id: 'backtracking-permutations',
            title: 'Permutations template',
            note: 'Swap elements in-place to generate permutations. After recursion, swap back to restore state.',
            js: `function permutations(nums) {
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]]; // choose
      backtrack(start + 1);                              // explore
      [nums[start], nums[i]] = [nums[i], nums[start]]; // unchoose
    }
  }

  backtrack(0);
  return result;
}

console.log(permutations([1, 2, 3]));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]]`,
            python: `def permutations(nums):
    result = []

    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]  # choose
            backtrack(start + 1)                          # explore
            nums[start], nums[i] = nums[i], nums[start]  # unchoose

    backtrack(0)
    return result

print(permutations([1, 2, 3]))
# [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]]`,
          },
        ],
      },
      {
        id: 'topological-sort',
        title: 'Topological Sort',
        whenToUse:
          "Use on directed acyclic graphs (DAGs) when you need a linear ordering of nodes such that all edges go from earlier to later. Classic use case: course scheduling, build dependency order.",
        codeBlocks: [
          {
            id: 'topological-sort-kahn',
            title: "Kahn's algorithm (BFS-based)",
            note: 'Start from nodes with in-degree 0. Each time you process a node, decrement its neighbors\' in-degree; enqueue those that reach 0.',
            js: `function topoSort(numNodes, edges) {
  const inDegree = new Array(numNodes).fill(0);
  const adj = Array.from({ length: numNodes }, () => []);

  for (const [u, v] of edges) {
    adj[u].push(v);
    inDegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // If order.length !== numNodes, graph has a cycle
  return order.length === numNodes ? order : [];
}

console.log(topoSort(4, [[0,1],[0,2],[1,3],[2,3]]));
// [0, 1, 2, 3] or [0, 2, 1, 3]`,
            python: `from collections import deque

def topo_sort(num_nodes, edges):
    in_degree = [0] * num_nodes
    adj = [[] for _ in range(num_nodes)]

    for u, v in edges:
        adj[u].append(v)
        in_degree[v] += 1

    queue = deque(i for i in range(num_nodes) if in_degree[i] == 0)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == num_nodes else []

print(topo_sort(4, [(0,1),(0,2),(1,3),(2,3)]))
# [0, 1, 2, 3] or [0, 2, 1, 3]`,
          },
        ],
      },
    ],
  },
  {
    id: 'binarysearch',
    label: 'Binary Search',
    patterns: [
      {
        id: 'binary-search',
        title: 'Classic Binary Search',
        whenToUse:
          'Use whenever the search space is sorted and you can eliminate half at each step. Also applies to finding leftmost/rightmost positions of a target.',
        codeBlocks: [
          {
            id: 'binary-search-exact',
            title: 'Find exact target',
            note: 'Standard lo/hi with mid = lo + Math.floor((hi - lo) / 2) to avoid integer overflow.',
            js: `function binarySearch(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1; // not found
}

console.log(binarySearch([1, 3, 5, 7, 9, 11], 7)); // 3
console.log(binarySearch([1, 3, 5, 7, 9, 11], 6)); // -1`,
            python: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1

    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return -1  # not found

print(binary_search([1, 3, 5, 7, 9, 11], 7))  # 3
print(binary_search([1, 3, 5, 7, 9, 11], 6))  # -1`,
          },
          {
            id: 'binary-search-leftmost',
            title: 'Find first occurrence (leftmost)',
            note: 'When mid matches, record it but keep searching left (hi = mid - 1) to find the earliest occurrence.',
            js: `function findFirst(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) {
      result = mid;
      hi = mid - 1; // keep searching left
    } else if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return result;
}

console.log(findFirst([1, 2, 2, 2, 3, 4], 2)); // 1`,
            python: `def find_first(nums, target):
    lo, hi = 0, len(nums) - 1
    result = -1

    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            result = mid
            hi = mid - 1  # keep searching left
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return result

print(find_first([1, 2, 2, 2, 3, 4], 2))  # 1`,
          },
        ],
      },
      {
        id: 'binary-search-on-answer',
        title: 'Binary Search on Answer',
        whenToUse:
          'Use when the answer is a value in a monotonic range and you can write a feasibility check: "is X a valid answer?". Binary search on the answer space rather than on an array.',
        codeBlocks: [
          {
            id: 'bsoa-ship',
            title: 'Min capacity to ship packages in D days',
            note: 'Binary search between max(weights) and sum(weights). For each candidate capacity, greedily check if D days suffice.',
            js: `function shipWithinDays(weights, days) {
  let lo = Math.max(...weights);      // must carry heaviest package
  let hi = weights.reduce((a, b) => a + b, 0); // ship all in 1 day

  function canShip(capacity) {
    let daysNeeded = 1;
    let load = 0;
    for (const w of weights) {
      if (load + w > capacity) {
        daysNeeded++;
        load = 0;
      }
      load += w;
    }
    return daysNeeded <= days;
  }

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canShip(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}

console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)); // 15`,
            python: `def ship_within_days(weights, days):
    lo = max(weights)           # must carry heaviest package
    hi = sum(weights)           # ship all in 1 day

    def can_ship(capacity):
        days_needed = 1
        load = 0
        for w in weights:
            if load + w > capacity:
                days_needed += 1
                load = 0
            load += w
        return days_needed <= days

    while lo < hi:
        mid = lo + (hi - lo) // 2
        if can_ship(mid):
            hi = mid
        else:
            lo = mid + 1

    return lo

print(ship_within_days([1,2,3,4,5,6,7,8,9,10], 5))  # 15`,
          },
        ],
      },
    ],
  },
  {
    id: 'dp',
    label: 'Dynamic Programming',
    patterns: [
      {
        id: 'dp-1d-memo',
        title: '1D Memoization',
        whenToUse:
          'Use top-down memoization when the recurrence is natural to express recursively and only a subset of states are reachable. A memo table (map or array) stores already-computed subproblem results.',
        codeBlocks: [
          {
            id: 'dp-1d-memo-fib',
            title: 'Fibonacci — top-down memoization',
            note: 'Cache results in a map so each subproblem is computed once. Time and space are both O(n).',
            js: `function fib(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}

console.log(fib(10)); // 55
console.log(fib(40)); // 102334155`,
            python: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))  # 55
print(fib(40))  # 102334155

# Manual memo version:
def fib_memo(n, memo={}):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]`,
          },
          {
            id: 'dp-1d-memo-climb',
            title: 'Climbing stairs — top-down memoization',
            note: 'You can climb 1 or 2 steps at a time. ways(n) = ways(n-1) + ways(n-2).',
            js: `function climbStairs(n, memo = {}) {
  if (n <= 2) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}

console.log(climbStairs(5));  // 8
console.log(climbStairs(10)); // 89`,
            python: `def climb_stairs_memo(n, memo={}):
    if n <= 2:
        return n
    if n in memo:
        return memo[n]
    memo[n] = climb_stairs_memo(n - 1, memo) + climb_stairs_memo(n - 2, memo)
    return memo[n]

print(climb_stairs_memo(5))   # 8
print(climb_stairs_memo(10))  # 89`,
          },
        ],
      },
      {
        id: 'dp-1d-tab',
        title: '1D Tabulation',
        whenToUse:
          'Use bottom-up tabulation when all subproblems must be computed anyway, or to avoid recursion stack overhead. Fill a dp array iteratively from smallest to largest subproblem.',
        codeBlocks: [
          {
            id: 'dp-1d-tab-climb',
            title: 'Climbing stairs — bottom-up tabulation',
            note: 'Build dp array from base cases up. dp[i] = dp[i-1] + dp[i-2].',
            js: `function climbStairsTab(n) {
  if (n <= 2) return n;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(climbStairsTab(5));  // 8
console.log(climbStairsTab(10)); // 89`,
            python: `def climb_stairs_tab(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2

    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]

print(climb_stairs_tab(5))   # 8
print(climb_stairs_tab(10))  # 89`,
          },
          {
            id: 'dp-1d-tab-space',
            title: 'Climbing stairs — O(1) space optimization',
            note: 'Since each state only depends on the previous two, we only need two variables instead of a full array.',
            js: `function climbStairsOpt(n) {
  if (n <= 2) return n;
  let prev2 = 1; // dp[i-2]
  let prev1 = 2; // dp[i-1]

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

console.log(climbStairsOpt(5));  // 8
console.log(climbStairsOpt(10)); // 89`,
            python: `def climb_stairs_opt(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2  # dp[i-2], dp[i-1]

    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev1 + prev2

    return prev1

print(climb_stairs_opt(5))   # 8
print(climb_stairs_opt(10))  # 89`,
          },
        ],
      },
      {
        id: 'dp-2d',
        title: '2D DP',
        whenToUse:
          'Use 2D DP when the state depends on two changing parameters — e.g., positions in two sequences, or a value and an index. Classic examples: LCS, edit distance, knapsack.',
        codeBlocks: [
          {
            id: 'dp-2d-lcs',
            title: 'Longest Common Subsequence',
            note: 'dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1]. If characters match, extend by 1; otherwise take the max from left or above.',
            js: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}

console.log(longestCommonSubsequence("abcde", "ace")); // 3
console.log(longestCommonSubsequence("abc", "abc"));   // 3
console.log(longestCommonSubsequence("abc", "def"));   // 0`,
            python: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]

print(longest_common_subsequence("abcde", "ace"))  # 3
print(longest_common_subsequence("abc", "abc"))    # 3
print(longest_common_subsequence("abc", "def"))    # 0`,
          },
        ],
      },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    patterns: [
      {
        id: 'hashmap',
        title: 'Hash Map / Frequency',
        whenToUse:
          'Use a hash map for O(1) lookups when you need to check membership, count frequencies, or store complement values. The classic tool for turning O(n²) brute-force into O(n).',
        codeBlocks: [
          {
            id: 'hashmap-twosum',
            title: 'Two Sum — complement lookup',
            note: 'Store each value\'s index in a map. For each element, check if its complement (target - x) is already in the map.',
            js: `function twoSum(nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));        // [1, 2]`,
            python: `def two_sum(nums, target):
    seen = {}  # value -> index

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))       # [1, 2]`,
          },
          {
            id: 'hashmap-frequency',
            title: 'Frequency counting',
            note: 'Count occurrences of each element in one pass. Useful for anagram checks, majority elements, and grouping.',
            js: `function frequencyCount(arr) {
  const freq = new Map();
  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  return freq;
}

// Example: check if two strings are anagrams
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = frequencyCount(s.split(''));
  for (const ch of t) {
    if (!freq.has(ch) || freq.get(ch) === 0) return false;
    freq.set(ch, freq.get(ch) - 1);
  }
  return true;
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false`,
            python: `from collections import Counter

def frequency_count(arr):
    freq = {}
    for item in arr:
        freq[item] = freq.get(item, 0) + 1
    return freq

# Example: check if two strings are anagrams
def is_anagram(s, t):
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)

print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False`,
          },
        ],
      },
      {
        id: 'merge-intervals',
        title: 'Merge Intervals',
        whenToUse:
          'Use when you have a list of intervals and need to merge all overlapping ones. Sort by start time first; then greedily extend the last merged interval if the current one overlaps.',
        codeBlocks: [
          {
            id: 'merge-intervals-main',
            title: 'Merge overlapping intervals',
            note: 'Sort by start. Compare each interval\'s start with the last merged interval\'s end to decide whether to merge or append.',
            js: `function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const [start, end] = intervals[i];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end); // extend
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]));
// [[1,6],[8,10],[15,18]]`,
            python: `def merge_intervals(intervals):
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        last = merged[-1]
        if start <= last[1]:
            last[1] = max(last[1], end)  # extend
        else:
            merged.append([start, end])

    return merged

print(merge_intervals([[1,3],[2,6],[8,10],[15,18]]))
# [[1, 6], [8, 10], [15, 18]]`,
          },
        ],
      },
      {
        id: 'heap',
        title: 'Heap / Priority Queue',
        whenToUse:
          'Use a heap when you need efficient access to the min or max element as the data changes. Common for K-th largest/smallest, scheduling, and running medians.',
        codeBlocks: [
          {
            id: 'heap-k-largest',
            title: 'K largest elements — min-heap of size k',
            note: 'Maintain a min-heap of size k. Each new element evicts the smallest if it is larger, so the heap always holds the k largest seen so far.',
            js: `// JavaScript has no built-in heap; use a simple sorted approach or a library.
// This implementation uses a min-heap class for clarity.

class MinHeap {
  constructor() { this.data = []; }
  push(val) {
    this.data.push(val);
    this.data.sort((a, b) => a - b); // O(k log k) — acceptable for small k
  }
  pop() { return this.data.shift(); }
  peek() { return this.data[0]; }
  size() { return this.data.length; }
}

function kLargest(nums, k) {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop();
  }
  return heap.data;
}

console.log(kLargest([3,2,1,5,6,4], 3)); // [4, 5, 6]`,
            python: `import heapq

def k_largest(nums, k):
    # Python's heapq is a min-heap
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # remove the smallest
    return sorted(heap)

print(k_largest([3, 2, 1, 5, 6, 4], 3))  # [4, 5, 6]`,
          },
          {
            id: 'heap-running-median',
            title: 'Running median — two heaps',
            note: 'Use a max-heap for the lower half and a min-heap for the upper half. Balance them so their sizes differ by at most 1.',
            js: `// Two-heap running median (conceptual JS implementation)
// Uses arrays to simulate heaps for readability.

class MaxHeap {
  constructor() { this.data = []; }
  push(val) { this.data.push(val); this.data.sort((a, b) => b - a); }
  pop() { return this.data.shift(); }
  peek() { return this.data[0]; }
  size() { return this.data.length; }
}

class MedianFinder {
  constructor() {
    this.lo = new MaxHeap(); // lower half
    this.hi = new MinHeap(); // upper half (MinHeap from above)
  }
  addNum(num) {
    this.lo.push(num);
    this.hi.push(this.lo.pop());        // balance: push max of lo to hi
    if (this.lo.size() < this.hi.size()) {
      this.lo.push(this.hi.pop());      // keep lo >= hi in size
    }
  }
  findMedian() {
    if (this.lo.size() > this.hi.size()) return this.lo.peek();
    return (this.lo.peek() + this.hi.peek()) / 2;
  }
}

const mf = new MedianFinder();
mf.addNum(1); mf.addNum(2);
console.log(mf.findMedian()); // 1.5
mf.addNum(3);
console.log(mf.findMedian()); // 2`,
            python: `import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (negate values)
        self.hi = []  # min-heap

    def add_num(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))  # push max of lo to hi
        if len(self.lo) < len(self.hi):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def find_median(self):
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2

mf = MedianFinder()
mf.add_num(1)
mf.add_num(2)
print(mf.find_median())  # 1.5
mf.add_num(3)
print(mf.find_median())  # 2.0`,
          },
        ],
      },
      {
        id: 'recursion',
        title: 'Recursion',
        whenToUse:
          'Use when a problem can be broken into identical subproblems that reduce toward a base case — common in tree traversal, divide-and-conquer, and combinatorics. Watch for overlapping subproblems (consider memoization then).',
        codeBlocks: [
          {
            id: 'rec-fibonacci',
            title: 'Fibonacci (recursive)',
            note: 'Classic recursion with two subproblems per call. Exponential time without memoization — each call spawns two more.',
            js: `function fib(n) {
  if (n <= 1) return n            // base case
  return fib(n - 1) + fib(n - 2) // recursive case
}

console.log(fib(5)) // 5`,
            python: `def fib(n):
    if n <= 1:                  # base case
        return n
    return fib(n-1) + fib(n-2) # recursive case

print(fib(5))  # 5`,
          },
          {
            id: 'rec-binary-search',
            title: 'Binary Search (recursive)',
            note: 'Divide-and-conquer: halves the search space on each call. O(log n) time, O(log n) call stack space.',
            js: `function binarySearch(arr, target, lo = 0, hi = arr.length - 1) {
  if (lo > hi) return -1                      // base case: not found
  const mid = Math.floor((lo + hi) / 2)
  if (arr[mid] === target) return mid          // base case: found
  if (arr[mid] < target)
    return binarySearch(arr, target, mid + 1, hi)  // search right half
  return binarySearch(arr, target, lo, mid - 1)    // search left half
}

console.log(binarySearch([1,3,5,7,9], 7)) // 3`,
            python: `def binary_search(arr, target, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo > hi: return -1                       # base case: not found
    mid = (lo + hi) // 2
    if arr[mid] == target: return mid           # base case: found
    if arr[mid] < target:
        return binary_search(arr, target, mid+1, hi)
    return binary_search(arr, target, lo, mid-1)

print(binary_search([1,3,5,7,9], 7))  # 3`,
          },
        ],
      },
    ],
  },
]
