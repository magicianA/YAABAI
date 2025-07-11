# Count Comparison

## Problem Description
Create an A=B program that determines whether the character counts in the input follow a specific ordering pattern.

Return "true" if and only if: **count(c) > count(b) > count(a)**

Otherwise, return "false".

## Input
A string containing only characters 'a', 'b', and 'c'.

## Output
- "true" if count(c) > count(b) > count(a)
- "false" otherwise

## Examples

### Example 1
**Input**: `abbccc`  
**Analysis**: count(a)=1, count(b)=2, count(c)=3 → 3 > 2 > 1 ✓  
**Output**: `true`

### Example 2
**Input**: `aabbcc`  
**Analysis**: count(a)=2, count(b)=2, count(c)=2 → Not strictly decreasing  
**Output**: `false`

### Example 3
**Input**: `abcccc`  
**Analysis**: count(a)=1, count(b)=1, count(c)=4 → 4 > 1 but 1 = 1, not >  
**Output**: `false`

### Example 4
**Input**: `abbbbccccc`  
**Analysis**: count(a)=1, count(b)=4, count(c)=5 → 5 > 4 > 1 ✓  
**Output**: `true`

### Example 5
**Input**: `cba`  
**Analysis**: count(a)=1, count(b)=1, count(c)=1 → All equal  
**Output**: `false`

### Example 6
**Input**: `abcabcabc`  
**Analysis**: count(a)=3, count(b)=3, count(c)=3 → All equal  
**Output**: `false`

## Strategy Hints
- Consider sorting characters first to group them together
- Use pattern matching to identify the required character sequence structure
- Think about how to eliminate valid patterns while preserving excess characters
- The final remaining pattern should indicate the result

## Difficulty
**Medium** - Requires understanding of character counting through pattern elimination and logical reasoning with A=B rules.