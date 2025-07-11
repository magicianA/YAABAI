# Length Modulo 3

## Problem Description
Create an A=B program that calculates the length of the input string modulo 3.

The program should return:
- "0" if the string length is divisible by 3
- "1" if the string length has remainder 1 when divided by 3  
- "2" if the string length has remainder 2 when divided by 3

## Input
A string containing only characters 'a', 'b', and 'c'.

## Output
A single digit: "0", "1", or "2" representing (string length) mod 3.

## Examples

### Example 1
**Input**: `abcabc`  
**Length**: 6  
**6 mod 3**: 0  
**Output**: `0`

### Example 2
**Input**: `a`  
**Length**: 1  
**1 mod 3**: 1  
**Output**: `1`

### Example 3
**Input**: `ab`  
**Length**: 2  
**2 mod 3**: 2  
**Output**: `2`

### Example 4
**Input**: `abc`  
**Length**: 3  
**3 mod 3**: 0  
**Output**: `0`

### Example 5
**Input**: `abca`  
**Length**: 4  
**4 mod 3**: 1  
**Output**: `1`

### Example 6
**Input**: `abcab`  
**Length**: 5  
**5 mod 3**: 2  
**Output**: `2`

### Example 7
**Input**: `""` (empty string)  
**Length**: 0  
**0 mod 3**: 0  
**Output**: `0`

## Strategy Hints
- Convert all characters to a uniform type first (e.g., all to 'a')
- Use pattern matching to remove groups of 3 characters
- The remaining characters indicate the remainder
- Use `(return)` for early termination with the correct result
- Handle the empty string case appropriately

## Difficulty
**Easy-Medium** - Good introduction to character normalization and pattern-based counting in A=B.