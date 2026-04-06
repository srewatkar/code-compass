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
  {
    category: 'Arrays / Lists',
    items: [
      {
        id: 'array-create',
        title: 'Create an array / list',
        note: 'Both use square bracket syntax. JS calls them arrays; Python calls them lists.',
        js: `const arr = [1, 2, 3]
const empty = []
const mixed = [1, 'two', true, null]
const nested = [[1, 2], [3, 4]]`,
        python: `lst = [1, 2, 3]
empty = []
mixed = [1, 'two', True, None]
nested = [[1, 2], [3, 4]]`,
      },
      {
        id: 'array-access',
        title: 'Access by index',
        note: 'Both use [index] syntax starting at 0. Python supports negative indexing (-1 = last); JS does not.',
        js: `const arr = ['a', 'b', 'c']
arr[0]      // 'a'
arr[2]      // 'c'
arr[-1]     // undefined ← JS has no negative indexing
arr[arr.length - 1]  // 'c' — last element in JS`,
        python: `lst = ['a', 'b', 'c']
lst[0]    # 'a'
lst[2]    # 'c'
lst[-1]   # 'c' ← negative indexing!
lst[-2]   # 'b'`,
      },
      {
        id: 'array-push-append',
        title: 'push() vs append()',
        note: "Add to the end of a list/array. JS uses push(); Python uses append().",
        js: `const arr = [1, 2, 3]
arr.push(4)       // [1, 2, 3, 4]
arr.push(5, 6)    // multiple at once → [1, 2, 3, 4, 5, 6]`,
        python: `lst = [1, 2, 3]
lst.append(4)         # [1, 2, 3, 4]
lst.extend([5, 6])    # multiple → [1, 2, 3, 4, 5, 6]
# append([5,6]) would add a nested list, not extend`,
      },
      {
        id: 'array-pop-shift',
        title: 'pop / shift / unshift',
        note: 'JS has push/pop (end) and unshift/shift (start). Python has append/pop (end) and insert/pop(0) (start).',
        js: `const arr = [1, 2, 3]
arr.pop()       // removes & returns 3 → arr = [1, 2]
arr.shift()     // removes & returns 1 → arr = [2]
arr.unshift(0)  // adds to start → arr = [0, 2]`,
        python: `lst = [1, 2, 3]
lst.pop()       # removes & returns 3 → lst = [1, 2]
lst.pop(0)      # removes & returns index 0 → lst = [2]
lst.insert(0, 0)  # adds to start → lst = [0, 2]`,
      },
      {
        id: 'array-slice',
        title: 'slice() / splice() vs list slicing',
        note: "JS slice() is non-destructive (returns copy). splice() mutates. Python uses [start:end] slice notation.",
        js: `const arr = [0, 1, 2, 3, 4]

// slice — non-destructive:
arr.slice(1, 3)    // [1, 2] — arr unchanged
arr.slice(-2)      // [3, 4]

// splice — mutates:
arr.splice(1, 2)           // removes 2 at index 1 → [1, 2]
arr.splice(1, 0, 'a', 'b') // insert at index 1`,
        python: `lst = [0, 1, 2, 3, 4]

# Slice — non-destructive:
lst[1:3]    # [1, 2] — lst unchanged
lst[-2:]    # [3, 4]
lst[::2]    # [0, 2, 4] — every 2nd

# Delete a range:
del lst[1:3]  # removes elements in-place`,
      },
      {
        id: 'array-indexof',
        title: 'indexOf / find vs index()',
        note: 'Find the position of a value. JS returns -1 if not found; Python raises ValueError.',
        js: `const arr = ['a', 'b', 'c', 'b']
arr.indexOf('b')         // 1 — first match
arr.lastIndexOf('b')     // 3 — last match
arr.indexOf('z')         // -1 — not found

arr.find(x => x > 'a')  // 'b' — first match by condition
arr.findIndex(x => x > 'a')  // 1 — index of condition match`,
        python: `lst = ['a', 'b', 'c', 'b']
lst.index('b')       # 1 — first match
lst.index('z')       # ValueError ← throws if not found

# Safe check first:
'z' in lst           # False
lst.index('b') if 'b' in lst else -1  # 1`,
      },
      {
        id: 'array-includes',
        title: 'includes() vs in operator',
        note: 'Check if a value exists. JS uses .includes(); Python uses in.',
        js: `[1, 2, 3].includes(2)   // true
[1, 2, 3].includes(5)   // false`,
        python: `2 in [1, 2, 3]    # True
5 in [1, 2, 3]    # False
5 not in [1, 2, 3]  # True`,
      },
      {
        id: 'array-map-filter',
        title: 'map / filter / reduce vs list comprehension',
        note: 'JS uses method chaining. Python prefers list comprehensions but also has map()/filter().',
        js: `const nums = [1, 2, 3, 4, 5]

nums.map(x => x * 2)          // [2, 4, 6, 8, 10]
nums.filter(x => x % 2 === 0) // [2, 4]
nums.reduce((acc, x) => acc + x, 0) // 15

// Chain them:
nums.filter(x => x % 2 === 0).map(x => x * 2) // [4, 8]`,
        python: `nums = [1, 2, 3, 4, 5]

# List comprehensions (preferred):
[x * 2 for x in nums]           # [2, 4, 6, 8, 10]
[x for x in nums if x % 2 == 0] # [2, 4]

# map/filter also work (returns iterators):
list(map(lambda x: x * 2, nums))          # [2, 4, 6, 8, 10]
list(filter(lambda x: x % 2 == 0, nums))  # [2, 4]

from functools import reduce
reduce(lambda acc, x: acc + x, nums)  # 15`,
      },
      {
        id: 'array-sort',
        title: 'sort()',
        note: "JS sort() mutates and converts to string by default — always pass a comparator for numbers. Python sort() is stable and works correctly out of the box.",
        js: `const arr = [3, 1, 2]
arr.sort()              // [1, 2, 3] — mutates arr
[10, 9, 2].sort()       // [10, 2, 9] ← string sort! bug
[10, 9, 2].sort((a, b) => a - b)  // [2, 9, 10] — numeric

const words = ['banana', 'apple', 'cherry']
words.sort()            // ['apple', 'banana', 'cherry']

// Non-mutating sort:
[...arr].sort((a, b) => a - b)`,
        python: `lst = [3, 1, 2]
lst.sort()              # [1, 2, 3] — mutates
sorted([3, 1, 2])       # returns new list, doesn't mutate

[10, 9, 2].sort()       # [2, 9, 10] ← works correctly

# Sort by key:
words = ['banana', 'apple', 'cherry']
sorted(words, key=len)  # ['apple', 'banana', 'cherry']
sorted(words, reverse=True)  # ['cherry', 'banana', 'apple']`,
      },
      {
        id: 'array-spread',
        title: 'Spread [...arr] vs list copy',
        note: 'Copy or merge arrays/lists. JS uses spread syntax. Python uses slice or list().',
        js: `const a = [1, 2, 3]

// Shallow copy:
const b = [...a]
const c = a.slice()

// Merge:
const merged = [...a, ...b]   // [1,2,3,1,2,3]
const prepend = [0, ...a]     // [0,1,2,3]`,
        python: `a = [1, 2, 3]

# Shallow copy:
b = a[:]          # slice copy
c = list(a)       # list() copy
d = a.copy()      # .copy() method

# Merge:
merged = a + b    # [1,2,3,1,2,3]
prepend = [0] + a # [0,1,2,3]`,
      },
      {
        id: 'array-length',
        title: 'length vs len()',
        note: 'JS uses the .length property. Python uses the len() built-in function.',
        js: `[1, 2, 3].length   // 3
[].length           // 0`,
        python: `len([1, 2, 3])   # 3
len([])          # 0`,
      },
      {
        id: 'array-from',
        title: 'Array.from() vs list()',
        note: 'Convert iterables to arrays/lists. Both are commonly used to convert strings, sets, ranges, etc.',
        js: `Array.from('hello')           // ['h','e','l','l','o']
Array.from(new Set([1,1,2]))  // [1, 2] — dedup
Array.from({length: 3}, (_, i) => i)  // [0, 1, 2]`,
        python: `list('hello')          # ['h','e','l','l','o']
list({1, 1, 2})        # [1, 2] — from set
list(range(3))         # [0, 1, 2]
list(map(str, [1,2]))  # ['1', '2']`,
      },
    ],
  },
  {
    category: 'Objects / Dicts',
    items: [
      {
        id: 'obj-create',
        title: 'Create an object / dict',
        note: 'JS objects use {} with key: value. Python dicts use {} with "key": value (keys must be strings or hashable types).',
        js: `const person = {
  name: 'Alice',
  age: 30,
  active: true,
}

// Keys don't need quotes (unless special chars):
const obj = { 'first-name': 'Alice' }`,
        python: `person = {
    'name': 'Alice',
    'age': 30,
    'active': True,
}

# Keys must be quoted strings (or any hashable):
obj = {'first-name': 'Alice'}
d = {1: 'one', 2: 'two'}  # integer keys ok`,
      },
      {
        id: 'obj-access',
        title: 'Access keys',
        note: 'JS: dot notation or bracket notation. Python: bracket notation or .get() for safe access.',
        js: `const obj = { name: 'Alice', age: 30 }

obj.name          // 'Alice' — dot notation
obj['name']       // 'Alice' — bracket notation
obj.missing       // undefined — no error
obj['missing']    // undefined — no error`,
        python: `obj = {'name': 'Alice', 'age': 30}

obj['name']         # 'Alice'
obj.get('name')     # 'Alice'
obj['missing']      # KeyError ← throws!
obj.get('missing')  # None — safe
obj.get('missing', 'default')  # 'default' — with fallback`,
      },
      {
        id: 'obj-add-delete',
        title: 'Add / delete keys',
        note: 'Both support adding keys dynamically and deleting them.',
        js: `const obj = { a: 1 }

obj.b = 2             // add key
obj['c'] = 3          // add key (bracket)

delete obj.b          // delete key
delete obj['c']       // delete key`,
        python: `obj = {'a': 1}

obj['b'] = 2          # add key
obj['c'] = 3          # add key

del obj['b']          # delete key
obj.pop('c')          # delete & return value
obj.pop('z', None)    # safe delete — no error if missing`,
      },
      {
        id: 'obj-keys-values',
        title: 'Object.keys() / .values() / .entries()',
        note: 'JS uses static methods on Object. Python has .keys(), .values(), .items() as dict methods.',
        js: `const obj = { a: 1, b: 2, c: 3 }

Object.keys(obj)    // ['a', 'b', 'c']
Object.values(obj)  // [1, 2, 3]
Object.entries(obj) // [['a',1],['b',2],['c',3]]`,
        python: `obj = {'a': 1, 'b': 2, 'c': 3}

list(obj.keys())    # ['a', 'b', 'c']
list(obj.values())  # [1, 2, 3]
list(obj.items())   # [('a',1),('b',2),('c',3)]

# Iterate directly:
for key, val in obj.items():
    print(key, val)`,
      },
      {
        id: 'obj-check-key',
        title: 'Check if key exists',
        note: 'JS uses "in" operator or hasOwnProperty(). Python uses "in" on the dict directly.',
        js: `const obj = { a: 1, b: 2 }

'a' in obj                  // true
obj.hasOwnProperty('a')     // true
'z' in obj                  // false
obj.a !== undefined          // true (but fragile)`,
        python: `obj = {'a': 1, 'b': 2}

'a' in obj       # True
'z' in obj       # False
'z' not in obj   # True`,
      },
      {
        id: 'obj-merge',
        title: 'Merge / copy objects',
        note: 'Shallow copy and merge. JS uses spread or Object.assign(). Python uses | operator (3.9+) or .update().',
        js: `const a = { x: 1 }
const b = { y: 2 }

// Merge:
const merged = { ...a, ...b }    // { x:1, y:2 }
const merged2 = Object.assign({}, a, b)

// Shallow copy:
const copy = { ...a }`,
        python: `a = {'x': 1}
b = {'y': 2}

# Merge (Python 3.9+):
merged = a | b       # {'x': 1, 'y': 2}
merged = {**a, **b}  # also works (older syntax)

# Shallow copy:
copy = a.copy()
copy2 = dict(a)

# Update in-place:
a.update(b)   # a is now {'x':1,'y':2}`,
      },
      {
        id: 'obj-loop',
        title: 'Loop over object / dict',
        note: 'Both support iterating keys, values, and key-value pairs.',
        js: `const obj = { a: 1, b: 2 }

// Keys:
for (const key in obj) { console.log(key) }
Object.keys(obj).forEach(k => console.log(k))

// Values:
Object.values(obj).forEach(v => console.log(v))

// Key-value pairs:
for (const [k, v] of Object.entries(obj)) {
  console.log(k, v)
}`,
        python: `obj = {'a': 1, 'b': 2}

# Keys:
for key in obj:
    print(key)

# Values:
for val in obj.values():
    print(val)

# Key-value pairs:
for key, val in obj.items():
    print(key, val)`,
      },
    ],
  },
  {
    category: 'Functions',
    items: [
      {
        id: 'fn-declare',
        title: 'Declare a function',
        note: 'JS has function declarations and function expressions. Python uses def.',
        js: `// Function declaration (hoisted):
function greet(name) {
  return \`Hello, \${name}!\`
}

// Function expression:
const greet2 = function(name) {
  return \`Hello, \${name}!\`
}

greet('Alice')   // 'Hello, Alice!'`,
        python: `def greet(name):
    return f'Hello, {name}!'

greet('Alice')   # 'Hello, Alice!'`,
      },
      {
        id: 'fn-arrow-lambda',
        title: 'Arrow functions vs lambda',
        note: 'Arrow functions are full functions. Python lambdas are limited to a single expression.',
        js: `// Arrow function — any complexity:
const double = x => x * 2
const add = (a, b) => a + b
const greet = name => \`Hello, \${name}!\`
const multi = (x) => {
  const doubled = x * 2
  return doubled + 1
}`,
        python: `# Lambda — single expression only:
double = lambda x: x * 2
add = lambda a, b: a + b

# For complexity, use def:
def multi(x):
    doubled = x * 2
    return doubled + 1`,
      },
      {
        id: 'fn-defaults',
        title: 'Default parameters',
        note: "Both support default values. Python default args must come after required args.",
        js: `function greet(name = 'World') {
  return \`Hello, \${name}!\`
}
greet()          // 'Hello, World!'
greet('Alice')   // 'Hello, Alice!'`,
        python: `def greet(name='World'):
    return f'Hello, {name}!'

greet()          # 'Hello, World!'
greet('Alice')   # 'Hello, Alice!'`,
      },
      {
        id: 'fn-rest-args',
        title: 'Rest (...args) vs *args',
        note: 'Collect extra positional arguments into an array/tuple.',
        js: `function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}
sum(1, 2, 3)   // 6

// Must be last param:
function first(a, b, ...rest) {
  console.log(rest)  // remaining args
}`,
        python: `def sum_all(*nums):
    return sum(nums)

sum_all(1, 2, 3)   # 6

# Must be last positional param:
def first(a, b, *rest):
    print(rest)   # remaining as tuple`,
      },
      {
        id: 'fn-kwargs',
        title: 'Keyword arguments (**kwargs)',
        note: "Python has named keyword arguments and **kwargs. JS simulates this with destructured objects.",
        js: `// JS: use destructuring for named args:
function create({ name, age = 0 } = {}) {
  return { name, age }
}
create({ name: 'Alice', age: 30 })
create({ name: 'Bob' })  // age defaults to 0`,
        python: `# Python: keyword args are built in:
def create(name, age=0):
    return {'name': name, 'age': age}

create('Alice', age=30)  # order doesn't matter
create(name='Bob')

# **kwargs collects all extra keyword args:
def log(**kwargs):
    for k, v in kwargs.items():
        print(k, v)

log(user='Alice', level='info')`,
      },
      {
        id: 'fn-return-multiple',
        title: 'Return multiple values',
        note: 'Python can return multiple values as a tuple. JS returns a single value — use an array or object.',
        js: `// Return array and destructure:
function minMax(arr) {
  return [Math.min(...arr), Math.max(...arr)]
}
const [min, max] = minMax([3, 1, 4, 1, 5])

// Return object:
function stats(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) }
}
const { min: mn, max: mx } = stats([1,2,3])`,
        python: `def min_max(lst):
    return min(lst), max(lst)  # returns a tuple

lo, hi = min_max([3, 1, 4, 1, 5])  # unpack`,
      },
    ],
  },
  {
    category: 'Types & Casting',
    items: [
      {
        id: 'casting-number',
        title: 'String → Number',
        note: "JS: Number(), parseInt(), parseFloat(). Python: int(), float(). JS is lenient; Python throws on invalid input.",
        js: `Number('42')       // 42
Number('3.14')     // 3.14
Number('')         // 0
Number('abc')      // NaN — no error thrown
parseInt('42px')   // 42 — stops at non-digit
parseFloat('3.14x')// 3.14`,
        python: `int('42')        # 42
float('3.14')    # 3.14
int('')          # ValueError
int('abc')       # ValueError
int('42px')      # ValueError — no partial parse`,
      },
      {
        id: 'casting-string',
        title: 'Number → String',
        note: 'Both convert numbers to strings easily. JS also uses toString().',
        js: `String(42)     // '42'
String(3.14)   // '3.14'
(42).toString() // '42'
\`\${42}\`        // '42' — template literal`,
        python: `str(42)     # '42'
str(3.14)   # '3.14'
f'{42}'     # '42' — f-string`,
      },
      {
        id: 'casting-bool',
        title: 'Casting to Boolean',
        note: 'Convert values to boolean. JS: Boolean(). Python: bool().',
        js: `Boolean(1)         // true
Boolean(0)         // false
Boolean('')        // false
Boolean('hello')   // true
Boolean([])        // true ← gotcha! empty array is truthy in JS
Boolean(null)      // false`,
        python: `bool(1)        # True
bool(0)        # False
bool('')       # False
bool('hello')  # True
bool([])       # False ← empty list is falsy in Python
bool(None)     # False`,
      },
      {
        id: 'destructuring',
        title: 'Destructuring vs unpacking',
        note: 'Extract values from arrays/lists and objects/dicts into variables.',
        js: `// Array destructuring:
const [a, b, c] = [1, 2, 3]
const [first, ...rest] = [1, 2, 3, 4]  // rest=[2,3,4]

// Object destructuring:
const { name, age } = { name: 'Alice', age: 30 }
const { name: n, age: a2 = 0 } = { name: 'Bob' }  // rename + default`,
        python: `# Sequence unpacking:
a, b, c = [1, 2, 3]
first, *rest = [1, 2, 3, 4]  # rest=[2,3,4]

# Dict unpacking — not directly, but:
person = {'name': 'Alice', 'age': 30}
name = person['name']
# or:
name, age = person['name'], person['age']`,
      },
    ],
  },
  {
    category: 'Async & Errors',
    items: [
      {
        id: 'try-catch',
        title: 'try/catch vs try/except',
        note: "Error handling syntax differs by name. Python also has an else clause (runs if no exception).",
        js: `try {
  const data = JSON.parse(badJson)
} catch (err) {
  console.error(err.message)
} finally {
  console.log('always runs')
}`,
        python: `try:
    data = json.loads(bad_json)
except json.JSONDecodeError as e:
    print(e)
except Exception as e:
    print('any error:', e)
else:
    print('no error — runs only if try succeeded')
finally:
    print('always runs')`,
      },
      {
        id: 'throw-raise',
        title: 'throw vs raise',
        note: 'JS uses throw, Python uses raise. Both can throw built-in or custom errors.',
        js: `throw new Error('something went wrong')
throw new TypeError('expected a string')

// Custom error:
class ValidationError extends Error {
  constructor(msg) { super(msg); this.name = 'ValidationError' }
}
throw new ValidationError('invalid input')`,
        python: `raise ValueError('something went wrong')
raise TypeError('expected a string')

# Custom exception:
class ValidationError(Exception):
    pass

raise ValidationError('invalid input')`,
      },
      {
        id: 'async-await',
        title: 'async / await',
        note: 'Both use async/await but JS returns Promises; Python uses coroutines with asyncio.',
        js: `async function fetchData(url) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

fetchData(url).then(data => console.log(data))`,
        python: `import asyncio
import aiohttp

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.json()

asyncio.run(fetch_data(url))`,
      },
    ],
  },
  {
    category: 'Misc / Gotchas',
    items: [
      {
        id: 'ternary',
        title: 'Ternary operator',
        note: 'JS uses condition ? a : b. Python uses a if condition else b.',
        js: `const age = 20
const label = age >= 18 ? 'adult' : 'minor'

// Nested (avoid):
const x = a ? 'a' : b ? 'b' : 'c'`,
        python: `age = 20
label = 'adult' if age >= 18 else 'minor'

# Nested (avoid):
x = 'a' if a else ('b' if b else 'c')`,
      },
      {
        id: 'short-circuit',
        title: 'Short-circuit: &&, ||, ?? vs and, or',
        note: 'JS and Python both short-circuit. JS adds the nullish coalescing operator (??) which Python lacks natively.',
        js: `// && — returns first falsy or last value:
null && 'hello'   // null
'hi' && 'hello'   // 'hello'

// || — returns first truthy or last value:
null || 'default'  // 'default'
0 || 'fallback'    // 'fallback' ← 0 is falsy

// ?? — only null/undefined triggers fallback:
0 ?? 'fallback'    // 0 ← 0 is NOT null/undefined
null ?? 'fallback' // 'fallback'`,
        python: `# and — returns first falsy or last value:
None and 'hello'   # None
'hi' and 'hello'   # 'hello'

# or — returns first truthy or last value:
None or 'default'  # 'default'
0 or 'fallback'    # 'fallback'

# No ?? in Python — use:
x = val if val is not None else 'default'`,
      },
      {
        id: 'list-comprehension',
        title: 'List comprehension (Python only)',
        note: 'Python list comprehensions are a concise way to build lists. JS uses map/filter instead.',
        js: `// JS equivalent — use map/filter:
const nums = [1, 2, 3, 4, 5]
nums.map(x => x ** 2)                   // [1,4,9,16,25]
nums.filter(x => x % 2 === 0)           // [2,4]
nums.filter(x => x%2===0).map(x=>x**2) // [4,16]`,
        python: `nums = [1, 2, 3, 4, 5]

[x**2 for x in nums]                    # [1,4,9,16,25]
[x for x in nums if x % 2 == 0]         # [2,4]
[x**2 for x in nums if x % 2 == 0]      # [4,16]

# Dict comprehension:
{k: v*2 for k, v in {'a':1,'b':2}.items()}  # {'a':2,'b':4}`,
      },
      {
        id: 'import',
        title: 'import / require vs import',
        note: 'JS has both CommonJS (require) and ES Modules (import). Python uses import with a consistent syntax.',
        js: `// ES Modules (modern):
import { useState } from 'react'
import React from 'react'
import * as utils from './utils'

// CommonJS (Node.js older style):
const fs = require('fs')
const { join } = require('path')`,
        python: `import os
import json
from pathlib import Path
from datetime import datetime, timedelta

# Alias:
import numpy as np

# Relative import (inside a package):
from .utils import helper`,
      },
      {
        id: 'equality',
        title: '== vs === vs Python ==',
        note: "JS has both == (loose, type coerces) and === (strict, no coercion). Python's == always compares values with type awareness.",
        js: `// == coerces types — avoid:
0 == false    // true ← ⚠️
'' == false   // true ← ⚠️
null == undefined  // true ← sometimes useful

// === strict — always use this:
0 === false   // false
1 === 1       // true
'1' === 1     // false`,
        python: `# Python == always type-aware:
0 == False    # True (bool is a subtype of int)
1 == True     # True
'' == False   # False ← no coercion

# Use 'is' for identity (like ===):
a is b        # same object in memory
a is None     # preferred None check`,
      },
    ],
  },
]
