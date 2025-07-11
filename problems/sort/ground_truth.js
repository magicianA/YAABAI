// Ground truth function for sort problem
// Input: string of a,b,c characters
// Output: alphabetically sorted string

export default function sortGroundTruth(input) {
  // Sort the characters in the string
  return input.split('').sort().join('');
}