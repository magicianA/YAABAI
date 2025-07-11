# A+B (Binary Addition)

## Problem Description
Create an A=B program that takes two binary numbers separated by a '+' sign and outputs their sum in binary.

This is an advanced problem that requires parsing input format, binary arithmetic implementation, and careful handling of carry propagation across multiple digits.

## Input
Two binary numbers separated by a '+' character, with no spaces.
Format: `binary1+binary2`

## Output
The binary representation of (binary1 + binary2) as a string.

## Constraints
- 1 ≤ each input number ≤ 31 (in decimal)
- Input numbers are valid binary (only '0' and '1' characters)
- No leading zeros except for the number "0" itself

## Examples

### Example 1
**Input**: `1001+110`  
**Decimal**: 9 + 6 = 15  
**Binary**: `1111`  
**Output**: `1111`

### Example 2
**Input**: `10+110`  
**Decimal**: 2 + 6 = 8  
**Binary**: `1000`  
**Output**: `1000`

### Example 3
**Input**: `1+1`  
**Decimal**: 1 + 1 = 2  
**Binary**: `10`  
**Output**: `10`

### Example 4
**Input**: `0+1`  
**Decimal**: 0 + 1 = 1  
**Binary**: `1`  
**Output**: `1`

### Example 5
**Input**: `111+1`  
**Decimal**: 7 + 1 = 8  
**Binary**: `1000`  
**Output**: `1000`

### Example 6
**Input**: `1010+101`  
**Decimal**: 10 + 5 = 15  
**Binary**: `1111`  
**Output**: `1111`

### Example 7
**Input**: `1111+1`  
**Decimal**: 15 + 1 = 16  
**Binary**: `10000`  
**Output**: `10000`

## Strategy Hints
- First parse the input to separate the two binary numbers
- Implement binary addition with proper carry handling
- Consider processing digits from right to left (least significant first)
- Be careful with pattern ordering - longer patterns should match first
- Handle cases where the sum requires more digits than either input

## Difficulty
**Hard** - Combines input parsing, binary arithmetic, and complex pattern matching. Requires mastery of A=B programming concepts.