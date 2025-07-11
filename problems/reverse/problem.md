# Reverse String

## Problem Description
Create an A=B program that reverses the input string, producing the characters in reverse order.

This is one of the most challenging problems in A=B programming, as the language doesn't have built-in support for string reversal. The solution requires creative use of character case transformation and bubble-sort-like techniques to move characters to their reversed positions.

## Input
A non-empty string containing only characters 'a', 'b', and 'c'.

## Output
The input string with characters in reverse order.

## Examples

### Example 1
**Input**: `abc`  
**Output**: `cba`

### Example 2
**Input**: `abcabc`  
**Output**: `cbacba`

### Example 3
**Input**: `a`  
**Output**: `a`

### Example 4
**Input**: `ab`  
**Output**: `ba`

### Example 5
**Input**: `cba`  
**Output**: `abc`

### Example 6
**Input**: `aaa`  
**Output**: `aaa`

### Example 7
**Input**: `abccba`  
**Output**: `abccba`

### Example 8
**Input**: `abcabcabc`  
**Output**: `cbacbacba`

## Strategy Hints
- Consider using uppercase letters as temporary markers to distinguish processed characters
- Use the `(end)` keyword to identify the rightmost character
- Use the `(start)` keyword to move characters to the front
- Implement a bubble-sort-like algorithm to move characters through the string
- Process characters from right to left, moving each to its final position
- Think about how to maintain character order during the reversal process

## Difficulty
**Very Hard** - This is an extremely challenging problem that requires advanced A=B programming techniques, character case manipulation, and complex pattern matching strategies. It demonstrates the full power and complexity possible with A=B programs.

