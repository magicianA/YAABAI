// Ground truth for replace_a_with_b problem
// Input: string of a,b,c
// Output: replace every a with b

export default function replaceAWithBGroundTruth(input) {
  return input.replace(/a/g, 'b');
}