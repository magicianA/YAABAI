// Ground truth for length_mod_3 problem
// Input: string of a,b,c  
// Output: length of string modulo 3

export default function lengthMod3GroundTruth(input) {
  return (input.length % 3).toString();
}