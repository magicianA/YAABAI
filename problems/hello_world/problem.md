# Hello World

## Problem Description
Create an A=B program that outputs exactly "helloworld" for any input string containing only the characters 'a', 'b', and 'c'.

This is a classic constant output problem that introduces the concept of using the `(return)` keyword for immediate program termination.

## Input
A string containing only characters 'a', 'b', and 'c'.

## Output
The exact string "helloworld" (without quotes), regardless of the input.

## Examples

### Example 1
**Input**: `aaabbcccaa`  
**Output**: `helloworld`

### Example 2
**Input**: `abc`  
**Output**: `helloworld`

### Example 3
**Input**: `c`  
**Output**: `helloworld`

### Example 4
**Input**: `bbbbbbbb`  
**Output**: `helloworld`

### Example 5
**Input**: `""` (empty string)  
**Output**: `helloworld`

### Example 6
**Input**: `abcabcabc`  
**Output**: `helloworld`

## Strategy Hints
- Use the `(return)` keyword to immediately terminate and output the result
- Consider checking for the presence of any valid input character
- Think about what pattern will always match in your input
- The program should produce the same output regardless of input content

## Difficulty
**Easy** - Introduces the `(return)` keyword and constant output patterns in A=B programming.
