// Ground truth function for remove_three problem
// Input: string of a,b,c characters  
// Output: string with first 3 characters removed

export default function removeThreeGroundTruth(input) {
  // Remove first 3 characters, or entire string if length <= 3
  return input.length <= 3 ? '' : input.substring(3);
}