# Sort Characters

## Problem Description
Create an A=B program that sorts all characters in the input string in alphabetical order.

This problem demonstrates bubble sort-like algorithms using pattern matching, where characters are systematically moved to their correct positions through repeated swaps.

## Input
A string containing only characters 'a', 'b', and 'c'.

## Output
A string with the same characters as the input, but arranged in alphabetical order (all 'a's first, then all 'b's, then all 'c's).

## Examples

### Example 1
**Input**: `aaabbcccaa`  
**Sorted**: `aaaaabbccc`  
**Output**: `aaaaabbccc`

### Example 2
**Input**: `cba`  
**Sorted**: `abc`  
**Output**: `abc`

### Example 3
**Input**: `abcabc`  
**Sorted**: `aabbcc`  
**Output**: `aabbcc`

### Example 4
**Input**: `ccccaaaa`  
**Sorted**: `aaaacccc`  
**Output**: `aaaacccc`

### Example 5
**Input**: `a`  
**Already sorted**: `a`  
**Output**: `a`

### Example 6
**Input**: `""` (empty string)  
**Already sorted**: `""`  
**Output**: `""` (empty string)

### Example 7
**Input**: `bcabcabca`  
**Sorted**: `aaabbbccc`  
**Output**: `aaabbbccc`

## Strategy Hints
- Use bubble sort approach: repeatedly swap adjacent characters that are out of order
- Create rules like `ba=ab` to swap 'b' and 'a' when 'b' comes before 'a'
- Similarly, create rules for other character pairs: `ca=ac`, `cb=bc`
- The A=B interpreter will continue applying rules until no more swaps are needed
- Think about which swaps are necessary to achieve alphabetical ordering

## Difficulty
**Easy-Medium** - Introduces sorting algorithms and demonstrates how repeated pattern matching can achieve complex string transformations.
