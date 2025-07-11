# Hello World (Hard)

## Problem Description
Create an A=B program that outputs exactly "helloworld" for any input string containing only the characters 'a', 'b', and 'c'.

**Constraint**: You may **not** use any A=B language keywords: `(start)`, `(end)`, `(return)`, or `(once)`.

This is a challenging problem that requires creative use of pattern matching and replacement rules to avoid infinite loops while producing the desired constant output.

## Input
A non-empty string containing only characters 'a', 'b', and 'c'.

## Output
The exact string "helloworld" (without quotes).

## Examples

### Example 1
**Input**: `abc`  
**Output**: `helloworld`

### Example 2  
**Input**: `aaabbcccaa`  
**Output**: `helloworld`

### Example 3
**Input**: `ccbba`  
**Output**: `helloworld`

### Example 4
**Input**: `a`  
**Output**: `helloworld`

## Strategy Hints
- Consider using intermediate symbols that don't appear in "helloworld"
- Think about how to consolidate multiple characters into a single marker
- Avoid patterns that match substrings of your target output
- Test with various input lengths and character combinations

## Difficulty
**Hard** - Requires understanding of pattern matching order and infinite loop prevention without using language keywords.
