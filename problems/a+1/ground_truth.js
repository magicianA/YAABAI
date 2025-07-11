// Ground truth for A+1 problem
// Input: binary number (1-31 in decimal)
// Output: input + 1 in binary

export default function aplusOneGroundTruth(input) {
  // Convert binary string to decimal, add 1, convert back to binary
  const decimal = parseInt(input, 2);
  return (decimal + 1).toString(2);
}