# Remove Three

## Problem Description
Create an A=B program that removes the first 3 characters from the input string.

This problem demonstrates position-based string manipulation and the use of the `(start)` keyword for matching patterns at the beginning of strings.

## Input
A string containing only characters 'a', 'b', and 'c'.

## Output
The input string with the first 3 characters removed. If the input has 3 or fewer characters, return an empty string.

## Examples

### Example 1
**Input**: `aaabbcccaa`  
**Remove first 3**: Remove "aaa"  
**Output**: `bbcccaa`

### Example 2
**Input**: `abc`  
**Remove first 3**: Remove "abc"  
**Output**: `""` (empty string)

### Example 3
**Input**: `abcdef` → `def` (if input contained d,e,f)  
**Input**: `abcabc`  
**Remove first 3**: Remove "abc"  
**Output**: `abc`

### Example 4
**Input**: `ab`  
**Length < 3**: Remove entire string  
**Output**: `""` (empty string)

### Example 5
**Input**: `a`  
**Length < 3**: Remove entire string  
**Output**: `""` (empty string)

### Example 6
**Input**: `""` (empty string)  
**Length < 3**: Nothing to remove  
**Output**: `""` (empty string)

### Example 7
**Input**: `abcabcabc`  
**Remove first 3**: Remove "abc"  
**Output**: `abcabc`

## Strategy Hints
- Use the `(start)` keyword to match patterns at the beginning of the string
- Think about how to match exactly 3 characters regardless of what they are
- Consider using wildcard patterns or multiple rules to handle all character combinations
- Remember that A=B processes patterns in order, so structure your rules accordingly

## Difficulty
**Easy-Medium** - Introduces position-based matching with the `(start)` keyword and demonstrates string prefix removal.
