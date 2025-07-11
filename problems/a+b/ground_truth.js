// Ground truth for A+B problem  
// Input: two binary numbers separated by +
// Output: sum in binary

export default function aplusbGroundTruth(input) {
  const parts = input.split('+');
  if (parts.length !== 2) {
    throw new Error('Invalid input format: expected "binary+binary"');
  }
  
  const a = parseInt(parts[0], 2);
  const b = parseInt(parts[1], 2);
  const sum = a + b;
  
  return sum.toString(2);
}