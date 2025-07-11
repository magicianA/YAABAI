# A+1 (Binary Increment)

## Problem Description
Create an A=B program that takes a binary number as input and outputs the binary representation of that number plus 1.

This problem demonstrates binary arithmetic using string manipulation and requires understanding of carry propagation in binary addition.

## Input
A binary number represented as a string containing only '0' and '1' characters.

## Output
The binary representation of (input + 1) as a string.

## Constraints
- 1 ≤ input number ≤ 31 (in decimal)
- Input is a valid binary number (no leading zeros except for "0")

## Examples

### Example 1
**Input**: `1001`  
**Decimal**: 9  
**9 + 1**: 10  
**Binary**: `1010`  
**Output**: `1010`

### Example 2
**Input**: `10`  
**Decimal**: 2  
**2 + 1**: 3  
**Binary**: `11`  
**Output**: `11`

### Example 3
**Input**: `1`  
**Decimal**: 1  
**1 + 1**: 2  
**Binary**: `10`  
**Output**: `10`

### Example 4
**Input**: `0`  
**Decimal**: 0  
**0 + 1**: 1  
**Binary**: `1`  
**Output**: `1`

### Example 5
**Input**: `111`  
**Decimal**: 7  
**7 + 1**: 8  
**Binary**: `1000`  
**Output**: `1000`

### Example 6
**Input**: `1111`  
**Decimal**: 15  
**15 + 1**: 16  
**Binary**: `10000`  
**Output**: `10000`

## Strategy Hints
- Process the binary number from right to left (least significant bit first)
- Handle carry propagation when adding 1
- Consider using pattern matching to identify different bit patterns
- Pay attention to pattern ordering - longer patterns should come first
- Think about how carries cascade through consecutive 1s

## Difficulty
**Medium-Hard** - Requires understanding of binary arithmetic, carry propagation, and careful pattern ordering in A=B programming.