// You are given an unordered array consisting of consecutive integers  [1, 2, 3, ..., n] without any duplicates. You are allowed to swap any two elements. You need to find the minimum number of swaps required to sort the array in ascending order.

// For example, given the array  we perform the following steps:

// i   arr                         swap (indices)
// 0   [7, 1, 3, 2, 4, 5, 6]   swap (0,3)
// 1   [2, 1, 3, 7, 4, 5, 6]   swap (0,1)
// 2   [1, 2, 3, 7, 4, 5, 6]   swap (3,4)
// 3   [1, 2, 3, 4, 7, 5, 6]   swap (4,5)
// 4   [1, 2, 3, 4, 5, 7, 6]   swap (5,6)
// 5   [1, 2, 3, 4, 5, 6, 7]
// It took  swaps to sort the array.

// Function Description

// Complete the function minimumSwaps in the editor below. It must return an integer representing the minimum number of swaps to sort the array.

// minimumSwaps has the following parameter(s):

// arr: an unordered array of integers
// Input Format

// The first line contains an integer, , the size of .
// The second line contains  space-separated integers .

// Constraints

// Output Format

// Return the minimum number of swaps to sort the given array.

// Sample Input 0

// 4
// 4 3 1 2
// Sample Output 0

// 3
// Explanation 0

// Given array
// After swapping  we get
// After swapping  we get
// After swapping  we get
// So, we need a minimum of  swaps to sort the array in ascending order.

// Sample Input 1

// 5
// 2 3 4 1 5
// Sample Output 1

// 3
// Explanation 1

// Given array
// After swapping  we get
// After swapping  we get
// After swapping  we get
// So, we need a minimum of  swaps to sort the array in ascending order.

// Sample Input 2

// 7
// 1 3 5 2 4 6 7
// Sample Output 2

// 3
// Explanation 2

// Given array
// After swapping  we get
// After swapping  we get
// After swapping  we get
// So, we need a minimum of  swaps to sort the array in ascending order.

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the minimumSwaps function below.

// [2, 3, 4, 1, 5]
// [1, 3, 4, 2, 5]  (0,3)
// [1, 4, 3, 2, 5]  (1,2)
// [1, 2, 3, 4, 5]  (1,3)

function swap(arr, index1, index2) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function minimumSwaps(arr) {
  let swapCount = 0;
  let i = 0;
  for (i = 0; i < arr.length; i++) {
    if (i === arr[i] - 1) {
      continue;
    }
    swap(arr, i, arr[i] - 1); // swapping ensure element at arr[i]-1 is in correct pos
    swapCount++;
    i--; // decrease i to ensure each element get check at the if statement and each i element in its correct pos
  }
  return swapCount;
}

// less effitient solution
// function minimumSwaps(arr) {
//   let swaps = 0,
//     i = 0;
//   while (i < arr.length - 1) {
//     if (i !== arr[i] - 1) {
//       swap(arr, i, arr[i] - 1);
//       swaps++;
//     } else {
//       i++;
//     }
//   }

//   return swaps;
// }

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  const arr = readLine()
    .split(' ')
    .map((arrTemp) => parseInt(arrTemp, 10));

  const res = minimumSwaps(arr);

  ws.write(res + '\n');

  ws.end();
}
