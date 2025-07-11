# Replace A with B

## Problem Description
Create an A=B program that replaces every occurrence of the character 'a' with the character 'b' in the input string.

This is a fundamental string manipulation problem that demonstrates basic pattern matching and replacement in the A=B language.

## Input
A string containing only characters 'a', 'b', and 'c'.

## Output
The input string with every 'a' character replaced by 'b'. Characters 'b' and 'c' remain unchanged.

## Examples

### Example 1
**Input**: `abc`  
**Output**: `bbc`

### Example 2
**Input**: `aaa`  
**Output**: `bbb`

### Example 3
**Input**: `bc`  
**Output**: `bc`

### Example 4
**Input**: `abacaba`  
**Output**: `bbbcbbb`

### Example 5
**Input**: `""` (empty string)  
**Output**: `""` (empty string)

### Example 6
**Input**: `abcabcabc`  
**Output**: `bbcbbcbbc`

### Example 7
**Input**: `cccaaa`  
**Output**: `cccbbb`

## Strategy Hints
- This problem requires only a single, simple replacement rule
- Think about what pattern matches 'a' and what to replace it with
- The A=B interpreter will continue applying the rule until no more 'a' characters remain
- No special keywords or modifiers are needed for this basic problem

## Difficulty
**Beginner** - Perfect introduction to A=B programming. Demonstrates the core concept of pattern matching and replacement.