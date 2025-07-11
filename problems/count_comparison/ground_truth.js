// Ground truth for count_comparison problem
// Input: string of a,b,c
// Output: true if count(c) > count(b) > count(a), else false

export default function countComparisonGroundTruth(input) {
  const countA = (input.match(/a/g) || []).length;
  const countB = (input.match(/b/g) || []).length;
  const countC = (input.match(/c/g) || []).length;
  
  return (countC > countB && countB > countA) ? 'true' : 'false';
}