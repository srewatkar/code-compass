export const topics = [
  {
    category: 'Basics',
    items: [
      {
        id: 'variables',
        title: 'Variables — var, let, const vs Python',
        note: 'Python has no declaration keyword — just assign. JS uses let (block-scoped, reassignable), const (block-scoped, not reassignable), or var (function-scoped, hoisted — avoid).',
        js: `var old = 'avoid this'   // function-scoped, hoisted
let name = 'Alice'       // block-scoped, reassignable
const age = 30           // block-scoped, cannot reassign

name = 'Bob'             // ✅ ok
// age = 31              // ❌ TypeError`,
        python: `name = 'Alice'    # just assign — no keyword needed
age = 30

name = 'Bob'      # ✅ reassignable
age = 31          # ✅ also reassignable (Python has no const)

# Want a constant? Convention is ALL_CAPS:
MAX_RETRIES = 3   # not enforced, just a signal`,
      },
      {
        id: 'data-types',
        title: 'Data types overview',
        note: 'Both languages have strings, numbers, booleans, null/None, arrays/lists, and objects/dicts. Key difference: JS has undefined and null; Python only has None.',
        js: `let str = 'hello'        // string
let num = 42             // number (int + float unified)
let float = 3.14         // same type as int
let bool = true          // boolean
let nothing = null       // null
let undef = undefined    // undefined (no equivalent in Python)
let arr = [1, 2, 3]     // array
let obj = { a: 1 }      // object`,
        python: `s = 'hello'           # str
n = 42               # int
f = 3.14             # float (separate type from int)
b = True             # bool (capital T/F)
nothing = None       # None (no undefined)
lst = [1, 2, 3]     # list
dct = {'a': 1}      # dict`,
      },
      {
        id: 'comments',
        title: 'Comments',
        note: 'JS uses // for single-line and /* */ for multi-line. Python uses # for single-line and triple quotes for multi-line.',
        js: `// single-line comment

/*
  multi-line comment
  spans multiple lines
*/

const x = 1 // inline comment`,
        python: `# single-line comment

"""
multi-line comment
(technically a string literal, but used as comment)
"""

x = 1  # inline comment`,
      },
      {
        id: 'print-log',
        title: 'print() vs console.log()',
        note: "Python uses print(), JS uses console.log(). Both accept multiple arguments. Python's print adds a newline by default.",
        js: `console.log('hello')
console.log('a', 'b', 'c')      // a b c
console.log(\`Value: \${42}\`)     // template literal
console.error('something broke')
console.warn('heads up')`,
        python: `print('hello')
print('a', 'b', 'c')        # a b c
print(f'Value: {42}')       # f-string
print('no newline', end='') # suppress newline`,
      },
      {
        id: 'typeof-type',
        title: 'typeof vs type()',
        note: 'JS typeof returns a string. Python type() returns the actual type object. Use isinstance() in Python for type checks.',
        js: `typeof 'hello'    // 'string'
typeof 42         // 'number'
typeof true       // 'boolean'
typeof null       // 'object' ← famous JS bug
typeof undefined  // 'undefined'
typeof []         // 'object'
typeof {}         // 'object'
Array.isArray([]) // true`,
        python: `type('hello')   # <class 'str'>
type(42)        # <class 'int'>
type(True)      # <class 'bool'>
type(None)      # <class 'NoneType'>
type([])        # <class 'list'>
type({})        # <class 'dict'>

isinstance(42, int)    # True  ← preferred for checks
isinstance([], list)   # True`,
      },
      {
        id: 'null-none',
        title: 'null / undefined vs None',
        note: "Python has one 'nothing' value: None. JS has two: null (intentional absence) and undefined (not yet assigned).",
        js: `let a           // undefined — not assigned
let b = null    // null — intentionally empty

a === undefined // true
b === null      // true
b == null       // true (also catches undefined)
b ?? 'default'  // 'default' — nullish coalescing`,
        python: `a = None        # the only "nothing" value

a is None       # True  ← use 'is', not '=='
a == None       # True  (works but 'is' is preferred)

# default fallback:
result = a or 'default'   # 'default'`,
      },
      {
        id: 'truthy-falsy',
        title: 'Truthy / Falsy values',
        note: 'Both languages have falsy values but they differ. Python treats 0, "", [], {}, None as falsy. JS adds undefined, null, NaN, and 0n.',
        js: `// Falsy in JS:
false, 0, 0n, '', null, undefined, NaN

// Everything else is truthy — including:
[], {}, 'false', -1

if ([]) console.log('truthy!')  // prints — gotcha!`,
        python: `# Falsy in Python:
# False, 0, 0.0, '', [], {}, set(), None

# Everything else truthy — including:
# non-zero numbers, non-empty strings/lists

if []:
    print('never')   # empty list is falsy

if [0]:
    print('truthy')  # list with one item is truthy`,
      },
    ],
  },
  {
    category: 'Loops',
    items: [
      {
        id: 'for-basic',
        title: 'Basic for loop',
        note: "JS for loop uses C-style syntax with an index. Python's for loop always iterates over a sequence — use range() to get index-based behavior.",
        js: `for (let i = 0; i < 5; i++) {
  console.log(i)  // 0 1 2 3 4
}

// Count down
for (let i = 5; i > 0; i--) {
  console.log(i)  // 5 4 3 2 1
}`,
        python: `for i in range(5):
    print(i)  # 0 1 2 3 4

# Count down
for i in range(5, 0, -1):
    print(i)  # 5 4 3 2 1`,
      },
      {
        id: 'while-loop',
        title: 'while loop',
        note: "while loops are nearly identical in both languages. Python has no do...while, but you can simulate it.",
        js: `let i = 0
while (i < 5) {
  console.log(i)
  i++
}

// do...while (runs at least once)
do {
  console.log('at least once')
} while (false)`,
        python: `i = 0
while i < 5:
    print(i)
    i += 1

# No do...while in Python — simulate:
while True:
    print('at least once')
    break`,
      },
      {
        id: 'for-in',
        title: 'for...in vs dict iteration',
        note: "JS for...in iterates over object keys (strings). Python's for loop over a dict gives keys by default. Both are for key iteration.",
        js: `const obj = { a: 1, b: 2, c: 3 }

for (const key in obj) {
  console.log(key)         // 'a' 'b' 'c'
  console.log(obj[key])    // 1 2 3
}

// ⚠️ for...in on arrays gives string indices — avoid:
const arr = ['x', 'y']
for (const i in arr) {
  console.log(typeof i)  // 'string', not number
}`,
        python: `obj = {'a': 1, 'b': 2, 'c': 3}

for key in obj:           # iterates over keys
    print(key)            # 'a' 'b' 'c'
    print(obj[key])       # 1 2 3

# Or iterate key+value together:
for key, val in obj.items():
    print(key, val)`,
      },
      {
        id: 'for-of',
        title: 'for...of vs for x in list',
        note: "JS for...of iterates over values of any iterable (arrays, strings, Maps). Python's for loop does the same — it always iterates values.",
        js: `const arr = ['a', 'b', 'c']

for (const item of arr) {
  console.log(item)   // 'a' 'b' 'c'
}

// Works on strings too:
for (const char of 'hello') {
  console.log(char)   // h e l l o
}

// With index — use entries():
for (const [i, val] of arr.entries()) {
  console.log(i, val) // 0 'a', 1 'b', 2 'c'
}`,
        python: `lst = ['a', 'b', 'c']

for item in lst:
    print(item)   # 'a' 'b' 'c'

# Works on strings too:
for char in 'hello':
    print(char)   # h e l l o

# With index — use enumerate():
for i, val in enumerate(lst):
    print(i, val) # 0 'a', 1 'b', 2 'c'`,
      },
      {
        id: 'range',
        title: 'range() — Python vs JS equivalent',
        note: "Python's range() generates a sequence of numbers. JS has no built-in equivalent — you use a for loop or Array.from().",
        js: `// No range() in JS — use a loop:
for (let i = 0; i < 5; i++) { ... }

// Or create an array equivalent:
Array.from({ length: 5 }, (_, i) => i)
// [0, 1, 2, 3, 4]

Array.from({ length: 5 }, (_, i) => i + 1)
// [1, 2, 3, 4, 5]

// Range with step:
Array.from({ length: 5 }, (_, i) => i * 2)
// [0, 2, 4, 6, 8]`,
        python: `range(5)          # 0 1 2 3 4
range(1, 6)       # 1 2 3 4 5
range(0, 10, 2)   # 0 2 4 6 8  (step)
range(5, 0, -1)   # 5 4 3 2 1  (reverse)

# range() is lazy — convert to list to see values:
list(range(5))    # [0, 1, 2, 3, 4]

for i in range(5):
    print(i)`,
      },
      {
        id: 'enumerate',
        title: 'enumerate() vs entries()',
        note: "Python's enumerate() adds an index to any iterable. JS uses Array.entries() or .forEach with index.",
        js: `const fruits = ['apple', 'banana', 'cherry']

// entries() gives [index, value] pairs:
for (const [i, fruit] of fruits.entries()) {
  console.log(i, fruit)
}
// 0 apple, 1 banana, 2 cherry

// forEach also gives index:
fruits.forEach((fruit, i) => {
  console.log(i, fruit)
})`,
        python: `fruits = ['apple', 'banana', 'cherry']

for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple, 1 banana, 2 cherry

# Start index at 1:
for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)
# 1 apple, 2 banana, 3 cherry`,
      },
      {
        id: 'break-continue',
        title: 'break / continue',
        note: "break and continue work the same in both languages. Python also has an else clause on loops (runs if loop didn't break).",
        js: `for (let i = 0; i < 10; i++) {
  if (i === 3) continue  // skip 3
  if (i === 7) break     // stop at 7
  console.log(i)         // 0 1 2 4 5 6
}`,
        python: `for i in range(10):
    if i == 3:
        continue   # skip 3
    if i == 7:
        break      # stop at 7
    print(i)       # 0 1 2 4 5 6

# Python bonus — loop else (runs if no break):
for i in range(5):
    pass
else:
    print('completed without break')`,
      },
    ],
  },
]
