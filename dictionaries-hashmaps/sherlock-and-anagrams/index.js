// Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string. Given a string, find the number of pairs of substrings of the string that are anagrams of each other.

// Example

// The list of all anagrammatic pairs is  at positions  respectively.

// Function Description

// Complete the function sherlockAndAnagrams in the editor below.

// sherlockAndAnagrams has the following parameter(s):

// string s: a string
// Returns

// int: the number of unordered anagrammatic pairs of substrings in
// Input Format

// The first line contains an integer , the number of queries.
// Each of the next  lines contains a string  to analyze.

// Constraints

//  contains only lowercase letters in the range ascii[a-z].

// Sample Input 0

// 2
// abba
// abcd
// Sample Output 0

// 4
// 0
// Explanation 0

// The list of all anagrammatic pairs is  and  at positions  and  respectively.

// No anagrammatic pairs exist in the second query as no character repeats.

// Sample Input 1

// 2
// ifailuhkqq
// kkkk
// Sample Output 1

// 3
// 10
// Explanation 1

// For the first query, we have anagram pairs  and  at positions  and  respectively.

// For the second query:
// There are 6 anagrams of the form  at positions  and .
// There are 3 anagrams of the form  at positions  and .
// There is 1 anagram of the form  at position .

// Sample Input 2

// 1
// cdcd
// Sample Output 2

// 5
// Explanation 2

// There are two anagrammatic pairs of length :  and .
// There are three anagrammatic pairs of length :  at positions  respectively.

'use strict';

const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
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

// Complete the sherlockAndAnagrams function below.
//abba
// aa (0,3)
// bb (1,2)
// ab (0,1)
// abb (0,2)

// a:2
// b:2
// ab:2
// abb:2

// cdcd
// c:2
// d:2
// cd:3  = pairs 3

// cc
// n=2, 1 pairs

// ccc
// n=3, 3 pairs

// cccc
// 1 (0,1)
// 2 (0,2)
// 3 (0,3)

// n=4 , 6 pairs

// ccccc

//n=5 , 10 pairs

// n=2, 1 pairs
// n=3, 3 pairs
// n=4, 6 pairs
// n=5, 10 pairs

// time complexity: O(s^3)
// space complexity: O(s)
function sherlockAndAnagrams(s) {
  let counter = 0;
  let hashMap = {};

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length + 1; j++) {
      let sub = s.slice(i, j);
      sub = sub.split('').sort().join('');
      if (hashMap[sub]) {
        // at least two anagrams were found.
        // tricky here, we need to count number of pair occurances.
        // we need to sum from 1 to n-1 (triangular number).
        //for example: n=5 ,sum = 1+2+3+4 = 10 pair of anagrams
        counter += hashMap[sub];
        hashMap[sub]++;
      } else {
        hashMap[sub] = 1;
      }
    }
  }
  return counter;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    let result = sherlockAndAnagrams(s);

    ws.write(result + '\n');
  }

  ws.end();
}
