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
  {
    category: 'Strings',
    items: [
      {
        id: 'string-create',
        title: 'Create strings & quote styles',
        note: 'Both support single and double quotes. JS adds backtick template literals. Python adds triple quotes for multi-line.',
        js: `let a = 'single quotes'
let b = "double quotes"
let c = \`backtick — template literal\`
let multi = \`line one
line two\``,
        python: `a = 'single quotes'
b = "double quotes"
c = f'f-string (like template literal)'
multi = """line one
line two"""
also = '''also multi-line'''`,
      },
      {
        id: 'template-fstring',
        title: 'Template literals vs f-strings',
        note: 'JS uses backticks with ${} interpolation. Python 3.6+ uses f-strings with {} interpolation.',
        js: `const name = 'Alice'
const age = 30

const msg = \`Hello, \${name}! You are \${age} years old.\`
const math = \`2 + 2 = \${2 + 2}\`
const method = \`\${name.toUpperCase()} wins!\``,
        python: `name = 'Alice'
age = 30

msg = f'Hello, {name}! You are {age} years old.'
math = f'2 + 2 = {2 + 2}'
method = f'{name.upper()} wins!'

# Older style (still works):
old = 'Hello, {}!'.format(name)
older = 'Hello, %s!' % name`,
      },
      {
        id: 'string-split',
        title: 'split()',
        note: "Both split strings into arrays/lists by a delimiter. Behavior is nearly identical.",
        js: `'a,b,c'.split(',')         // ['a', 'b', 'c']
'hello world'.split(' ')  // ['hello', 'world']
'hello'.split('')          // ['h','e','l','l','o']
'a,b,c'.split(',', 2)     // ['a', 'b'] — limit`,
        python: `'a,b,c'.split(',')          # ['a', 'b', 'c']
'hello world'.split(' ')   # ['hello', 'world']
list('hello')              # ['h','e','l','l','o']
'a,b,c'.split(',', 2)      # ['a', 'b', 'c'] ← maxsplit differs!
# Note: Python's maxsplit splits at most N times`,
      },
      {
        id: 'string-join',
        title: 'join()',
        note: 'JS: array.join(separator). Python: separator.join(iterable) — reversed from JS, which trips people up.',
        js: `['a', 'b', 'c'].join(',')   // 'a,b,c'
['hello', 'world'].join(' ')  // 'hello world'
['a', 'b', 'c'].join('')    // 'abc'`,
        python: `','.join(['a', 'b', 'c'])    # 'a,b,c'
' '.join(['hello', 'world']) # 'hello world'
''.join(['a', 'b', 'c'])    # 'abc'

# Common gotcha — must be strings:
# ','.join([1, 2, 3])  ← TypeError
','.join(str(x) for x in [1, 2, 3])  # '1,2,3'`,
      },
      {
        id: 'string-slice',
        title: 'slice / substring',
        note: 'JS has slice() and substring(). Python uses slice notation [start:end:step] which is more powerful.',
        js: `const s = 'hello world'

s.slice(0, 5)      // 'hello'
s.slice(6)         // 'world'
s.slice(-5)        // 'world' — negative counts from end
s.substring(0, 5)  // 'hello' (no negatives)`,
        python: `s = 'hello world'

s[0:5]    # 'hello'
s[6:]     # 'world'
s[-5:]    # 'world' — negative index
s[::2]    # 'hlowrd' — every 2nd char (step)
s[::-1]   # 'dlrow olleh' — reverse!`,
      },
      {
        id: 'string-length',
        title: 'length vs len()',
        note: 'JS uses the .length property. Python uses the len() built-in function.',
        js: `'hello'.length    // 5
''.length          // 0

const s = 'world'
s.length           // 5`,
        python: `len('hello')    # 5
len('')        # 0

s = 'world'
len(s)         # 5`,
      },
      {
        id: 'string-case',
        title: 'toUpperCase / toLowerCase vs upper / lower',
        note: 'Almost identical — JS uses camelCase method names, Python uses snake_case.',
        js: `'hello'.toUpperCase()   // 'HELLO'
'WORLD'.toLowerCase()   // 'world'`,
        python: `'hello'.upper()   # 'HELLO'
'WORLD'.lower()   # 'world'
'hello world'.title()   # 'Hello World'
'Hello World'.swapcase() # 'hELLO wORLD'`,
      },
      {
        id: 'string-trim',
        title: 'trim() vs strip()',
        note: 'Removes whitespace from start/end of a string. JS: trim/trimStart/trimEnd. Python: strip/lstrip/rstrip.',
        js: `'  hello  '.trim()        // 'hello'
'  hello  '.trimStart()   // 'hello  '
'  hello  '.trimEnd()     // '  hello'`,
        python: `'  hello  '.strip()    # 'hello'
'  hello  '.lstrip()  # 'hello  '
'  hello  '.rstrip()  # '  hello'

# Also strips specific characters:
'###hello###'.strip('#')  # 'hello'`,
      },
      {
        id: 'string-includes',
        title: 'includes() vs in operator',
        note: 'Check if a value exists. JS uses .includes(); Python uses in.',
        js: `'hello world'.includes('world')   // true
'hello world'.includes('xyz')     // false
'hello world'.includes('Hello')   // false — case sensitive`,
        python: `'world' in 'hello world'    # True
'xyz' in 'hello world'      # False
'Hello' in 'hello world'    # False — case sensitive`,
      },
      {
        id: 'string-replace',
        title: 'replace() / replaceAll()',
        note: "JS replace() replaces first match by default; replaceAll() replaces all. Python replace() replaces all by default.",
        js: `'aabbcc'.replace('b', 'X')     // 'aaXbcc' — only first!
'aabbcc'.replaceAll('b', 'X')  // 'aaXXcc' — all
'aabbcc'.replace(/b/g, 'X')   // 'aaXXcc' — regex all`,
        python: `'aabbcc'.replace('b', 'X')      # 'aaXXcc' — all by default
'aabbcc'.replace('b', 'X', 1)  # 'aaXbcc' — limit to 1`,
      },
      {
        id: 'string-startswith',
        title: 'startsWith() / endsWith()',
        note: 'Nearly identical. Python also accepts a tuple of prefixes/suffixes to check multiple at once.',
        js: `'hello world'.startsWith('hello')  // true
'hello world'.endsWith('world')   // true
'hello world'.startsWith('world') // false`,
        python: `'hello world'.startswith('hello')  # True
'hello world'.endswith('world')   # True

# Python bonus — check multiple:
'hello'.startswith(('hi', 'hello', 'hey'))  # True`,
      },
      {
        id: 'string-repeat',
        title: 'repeat() vs string multiplication',
        note: 'JS uses .repeat(). Python uses the * operator directly on the string.',
        js: `'ha'.repeat(3)   // 'hahaha'
'-'.repeat(10)   // '----------'`,
        python: `'ha' * 3    # 'hahaha'
'-' * 10    # '----------'`,
      },
      {
        id: 'string-pad',
        title: 'padStart() / padEnd()',
        note: 'JS has padStart/padEnd. Python uses ljust/rjust/center or f-string formatting.',
        js: `'5'.padStart(3, '0')   // '005'
'hi'.padEnd(5, '.')    // 'hi...'`,
        python: `'5'.zfill(3)         # '005'
'hi'.ljust(5, '.')  # 'hi...'
'hi'.rjust(5, '.')  # '...hi'
'hi'.center(6, '-') # '--hi--'

# f-string formatting:
f'{"5":>03}'        # '005'`,
      },
      {
        id: 'string-to-number',
        title: 'String ↔ Number conversion',
        note: "JS uses Number(), parseInt(), parseFloat(). Python uses int() and float(). JS is lenient; Python throws on invalid input.",
        js: `Number('42')        // 42
Number('3.14')      // 3.14
Number('hello')     // NaN ← doesn't throw
parseInt('42px')    // 42 — parses until non-digit
parseFloat('3.14x') // 3.14

String(42)          // '42'
(42).toString()     // '42'`,
        python: `int('42')           # 42
float('3.14')       # 3.14
int('hello')        # ValueError ← throws
int('42px')         # ValueError — no partial parse

str(42)             # '42'`,
      },
      {
        id: 'string-charat',
        title: 'charAt() / indexing',
        note: 'Python treats strings like sequences — index with []. JS uses bracket notation or charAt().',
        js: `const s = 'hello'
s[0]           // 'h'
s.charAt(0)    // 'h'
s[s.length-1]  // 'o'
s[-1]          // undefined ← no negative indexing in JS`,
        python: `s = 'hello'
s[0]    # 'h'
s[-1]   # 'o' — negative indexing works!
s[-2]   # 'l'`,
      },
    ],
  },
]
