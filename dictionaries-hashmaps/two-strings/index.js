// Given two strings, determine if they share a common substring. A substring may be as small as one character.

// Example

// These share the common substring .

// These do not share a substring.

// Function Description

// Complete the function twoStrings in the editor below.

// twoStrings has the following parameter(s):

// string s1: a string
// string s2: another string
// Returns

// string: either YES or NO
// Input Format

// The first line contains a single integer , the number of test cases.

// The following  pairs of lines are as follows:

// The first line contains string .
// The second line contains string .
// Constraints

//  and  consist of characters in the range ascii[a-z].
// Output Format

// For each pair of strings, return YES or NO.

// Sample Input

// 2
// hello
// world
// hi
// world
// Sample Output

// YES
// NO
// Explanation

// We have  pairs to check:

// , . The substrings  and  are common to both strings.
// , .  and  share no common substrings.

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', (_) => {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}
// Complete the twoStrings function below.

// **** final solution ****:
// Time Complexity: O(s1+s2);
// Space Complexity: O(s1)
function twoStrings(s1, s2) {
  if (!s1.length || !s2.length) {
    return 'NO';
  }

  const hashMap = {};
  for (let i = 0; i < s1.length; i++) {
    let char = s1[i];
    hashMap[char] = hashMap[char] || 0;
    hashMap[char]++;
  } //creating a hash map of the biggest string

  for (let i = 0; i < s2.length; i++) {
    let char = s2[i];
    if (hashMap[char]) {
      return 'YES';
    }
  }
  return 'NO';
}

// initial solution;
function twoStrings(s1, s2) {
  if (!s1.length || !s2.length) {
    return 'NO';
  }
  const hashMap = {};
  const bigString = s1.length > s2.length ? s1 : s2;
  const smallString = s2.length < s1.length ? s2 : s1;
  // order of s2 and s1 need to be different for smallString than for bigString to account for the case when both string has the same length

  for (let i = 0; i < bigString.length; i++) {
    let char = bigString[i];
    hashMap[char] = hashMap[char] || 0;
    hashMap[char]++;
  } //creating a hash map of the biggest string

  for (let i = 0; i < smallString.length; i++) {
    let char = smallString[i];
    if (hashMap[char]) {
      return 'YES';
    }
  }
  return 'NO';
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s1 = readLine();

    const s2 = readLine();

    let result = twoStrings(s1, s2);

    ws.write(result + '\n');
  }

  ws.end();
}
