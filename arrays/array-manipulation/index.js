// Starting with a 1-indexed array of zeros and a list of operations, for each operation add a value to each the array element between two given indices, inclusive. Once all operations have been performed, return the maximum value in the array.

// Example

// Queries are interpreted as follows:

//     a b k
//     1 5 3
//     4 8 7
//     6 9 1
// Add the values of  between the indices  and  inclusive:

// index->	 1 2 3  4  5 6 7 8 9 10
// 	[0,0,0, 0, 0,0,0,0,0, 0]
// 	[3,3,3, 3, 3,0,0,0,0, 0]
// 	[3,3,3,10,10,7,7,7,0, 0]
// 	[3,3,3,10,10,8,8,8,1, 0]
// The largest value is  after all operations are performed.

// Function Description

// Complete the function arrayManipulation in the editor below.

// arrayManipulation has the following parameters:

// int n - the number of elements in the array
// int queries[q][3] - a two dimensional array of queries where each queries[i] contains three integers, a, b, and k.
// Returns

// int - the maximum value in the resultant array
// Input Format

// The first line contains two space-separated integers  and , the size of the array and the number of operations.
// Each of the next  lines contains three space-separated integers ,  and , the left index, right index and summand.

// Constraints

// Sample Input

// 5 3
// 1 2 100
// 2 5 100
// 3 4 100
// Sample Output

// 200
// Explanation

// After the first update the list is 100 100 0 0 0.
// After the second update list is 100 200 100 100 100.
// After the third update list is 100 200 200 200 100.

// The maximum value is .

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

// Complete the arrayManipulation function below.

// **** Solution 1 ****:
// Time Complexity: O(n*m)
// Space Complexity: O(n)

// function arrayManipulation(n, queries) {
//   const resArr = [];
//   let max = -Infinity;
//   //zero array
//   for (let i = 0; i < n; i++) {
//     resArr[i] = 0;
//   }

//   console.log('queries', queries);
//   for (let i = 0; i < queries.length; i++) {
//     // let adder = queries[i][2];
//     for (let j = queries[i][0] - 1; j < queries[i][1]; j++) {
//       resArr[j] += queries[i][2];
//       console.log('j', j, 'i', i);
//       if (resArr[j] > max) {
//         max = resArr[j];
//       }
//     }
//     // console.log('resArr', resArr,'max',max);
//   }
//   return max;
// }

// **** Solution 2 ****:
// Time Complexity: O(n) or O(m) whichever is larger
// Space Complexity: O(n)

// function arrayManipulation(n, queries) {
//   // use the queries index and number as a place mark in the zero-array. Add k to startRange and substract k to endRange + 1
//   // then use an accumulator variable to get the total value for each element in the array and save the max value in a variable.

//   const arr = new Array(n + 1);

//   const length = Math.max(arr.length, queries.length);
//   for (let i = 0; i < length; i++) {
//     arr[i] = arr[i] || 0;
//     let q = queries[i];

//     if (q) {
//       let start = q[0] - 1,
//         end = q[1],
//         k = q[2];
//       arr[start] = arr[start] || 0;
//       arr[start] += k;
//       arr[end] = arr[end] || 0; //initialize el to zero if it has not been visited yet
//       arr[end] -= k;
//     }
//   }

//   let acc = 0,
//     max = 0;
//   for (let val of arr) {
//     acc += val;

//     if (acc > max) {
//       max = acc;
//     }
//   }

//   return max;
// }

// **** Solution 3 ****:
// Time Complexity: O(n+m)
// Space Complexity: O(n)

function arrayManipulation(n, queries) {
  // use the queries index and number as a place mark in the zero-array. Add k to startRange and substract k to endRange + 1
  // then use an accumulator variable to get the total value for each element in the array and save the max value in a variable.

  const arr = new Array(n + 1);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = 0;
  }
  for (let q of queries) {
    let start = q[0] - 1,
      end = q[1],
      k = q[2];
    arr[start] += k;
    arr[end] -= k;
  }

  let acc = 0,
    max = 0;
  for (let val of arr) {
    acc += val;
    if (acc > max) {
      max = acc;
    }
  }

  return max;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const nm = readLine().split(' ');

  const n = parseInt(nm[0], 10);

  const m = parseInt(nm[1], 10);

  let queries = Array(m);

  for (let i = 0; i < m; i++) {
    queries[i] = readLine()
      .split(' ')
      .map((queriesTemp) => parseInt(queriesTemp, 10));
  }

  let result = arrayManipulation(n, queries);

  ws.write(result + '\n');

  ws.end();
}
