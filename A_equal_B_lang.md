# A=B Programming Language

A=B is a minimal programming language designed for string manipulation. It features simple syntax, ease of learning, and powerful string processing capabilities through pattern matching and replacement.

**Note**: A=B is Turing complete, meaning it can compute any function that is computable by a Turing machine. Despite its simple syntax with only string replacement rules, the language is theoretically as powerful as any general-purpose programming language.

## Language Overview

A=B programs operate on input strings through a series of transformation rules. Each rule can match patterns in the string and replace them with new content. The program continues executing rules until no more matches are found, then returns the final string.

## Instruction Set

### Basic Replacement
```
string1=string2
```
Find the leftmost occurrence of `string1` in the current string and replace it with `string2`.

**Example:**
- Input: `"abc"`
- Rule: `a=x`
- Output: `"xbc"`

### Return Statement
```
string1=(return)string2
```
If `string1` is found anywhere in the string, immediately terminate the program and replace the **entire string** with `string2`.

**Example:**
- Input: `"abc"`
- Rule: `b=(return)found`
- Output: `"found"`

### Position-Based Matching
```
(start)string1=string2
(end)string1=string2
```
Match `string1` only if it appears at the start or end of the string, then replace with `string2`.

**Examples:**
- Input: `"abc"`, Rule: `(start)a=x` → Output: `"xbc"`
- Input: `"abc"`, Rule: `(end)c=x` → Output: `"abx"`
- Input: `"abc"`, Rule: `(start)b=x` → No match (b is not at start)

### Move Operations
```
string1=(start)string2
string1=(end)string2
```
Find the leftmost occurrence of `string1`, remove it, and add `string2` to the start or end of the string.

**Examples:**
- Input: `"abc"`, Rule: `b=(start)x` → Output: `"xac"`
- Input: `"abc"`, Rule: `b=(end)x` → Output: `"acx"`

### Once Modifier
```
(once)string1=string2
```
Execute this rule at most once during the entire program execution. After the first execution, this rule is ignored.

**Example:**
- Input: `"aaa"`, Rule: `(once)a=b` → Output: `"baa"` (only first 'a' is replaced)

## Program Structure

- Each line contains exactly one instruction or is blank
- Each instruction must have exactly one `=` sign
- Reserved characters: `=`, `(`, `)`, `#`
- Parentheses must be paired and contain keywords
- Each side of `=` may contain at most one keyword

## Execution Model

1. **Initialize**: Read the input string
2. **Match**: Starting from the first line, find the first rule that can be executed
3. **Execute**: Apply the matching rule to transform the string
4. **Repeat**: Go back to step 2 with the transformed string
5. **Terminate**: If no rules match, return the current string as output

## Comments

Lines beginning with `#` or text after `#` in any line are treated as comments and ignored during execution.

```
# This is a comment
a=b  # Replace a with b
```

## Example Programs

### 1. Character Replacement

**Problem**: Replace every 'a' with 'b'

**Input**: String of a, b, c characters  
**Output**: String with all 'a' replaced by 'b'

```
a=b
```

**Trace for input "abc"**:
1. `"abc"` → rule `a=b` matches → `"bbc"`
2. `"bbc"` → rule `a=b` no match → terminate
3. Output: `"bbc"`

### 2. String Length Modulo 3

**Problem**: Calculate the length of the string modulo 3

**Input**: String of a, b, c characters  
**Output**: Length mod 3 as a string ("0", "1", or "2")

```
b=a          # Convert all characters to 'a'
c=a
aaa=         # Remove groups of 3
aa=(return)2 # If 2 remain, return "2"
a=(return)1  # If 1 remains, return "1"  
=(return)0   # If none remain, return "0"
```

**Trace for input "abcab" (length 5)**:
1. `"abcab"` → `b=a` → `"aacaa"`
2. `"aacaa"` → `b=a` → `"aacaa"` (no change)
3. `"aacaa"` → `c=a` → `"aaaaa"`
4. `"aaaaa"` → `aaa=` → `"aa"`
5. `"aa"` → `aa=(return)2` → return `"2"`

### 3. Character Count Comparison

**Problem**: Return "true" if count(c) > count(b) > count(a), otherwise "false"

**Input**: String of a, b, c characters  
**Output**: "true" or "false"

```
ba=ab        # Sort: move b's before a's
cb=bc        # Sort: move c's before b's  
ca=ac        # Sort: move c's before a's
abc=         # Remove valid "abc" patterns
abbc=b       # Remove "abbc" → "b" (extra b)
bbc=b        # Remove "bbc" → "b" (extra b)
bcc=(return)true   # If pattern "bcc" exists → true
=(return)false     # Otherwise → false
```

**Trace for input "abbcc"**:
1. `"abbcc"` → sorting rules → `"abbcc"` (already sorted)
2. `"abbcc"` → `abc=` → `"bc"`
3. `"bc"` → no more matches except `=(return)false`
4. Output: `"false"`

## Advanced Concepts

### Pattern Matching Order
Rules are matched in order from top to bottom. The first matching rule is executed.

### Substring vs Exact Matching
- `abc=def` matches "abc" anywhere in the string
- `(start)abc=def` only matches "abc" at the beginning
- `(end)abc=def` only matches "abc" at the end

### Termination
Programs automatically terminate when no rules can be applied, ensuring programs always halt (no infinite loops possible with standard rules).

### Rule Precedence
When designing A=B programs:
1. Place more specific patterns before general ones
2. Use `(return)` for early termination
3. Use `(once)` to prevent infinite rule application

