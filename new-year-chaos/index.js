// It is New Year's Day and people are in line for the Wonderland rollercoaster ride. Each person wears a sticker indicating their initial position in the queue. Initial positions increment by  from  at the front of the line to  at the back.

// Any person in the queue can bribe the person directly in front of them to swap positions. If two people swap positions, they still wear the same sticker denoting their original places in line. One person can bribe at most two others. For example, if  and  bribes , the queue will look like this: .

// Fascinated by this chaotic queue, you decide you must know the minimum number of bribes that took place to get the queue into its current state. If anyone has bribed more than two people, the line is too chaotic to compute the answer.

// Function Description

// Complete the function minimumBribes in the editor below.

// minimumBribes has the following parameter(s):

// int q[n]: the positions of the people after all bribes
// Returns

// No value is returned. Print the minimum number of bribes necessary or Too chaotic if someone has bribed more than  people.
// Input Format

// The first line contains an integer , the number of test cases.

// Each of the next  pairs of lines are as follows:
// - The first line contains an integer , the number of people in the queue
// - The second line has  space-separated integers describing the final state of the queue.

// Constraints

// Subtasks

// For  score
// For  score

// Sample Input

// 2
// 5
// 2 1 5 3 4
// 5
// 2 5 1 3 4
// Sample Output

// 3
// Too chaotic
// Explanation

// Test Case 1

// The initial state:

// pic1(1).png

// After person  moves one position ahead by bribing person :

// pic2.png

// Now person  moves another position ahead by bribing person :

// pic3.png

// And person  moves one position ahead by bribing person :

// pic5.png

// So the final state is  after three bribing operations.

// Test Case 2

// No person can bribe more than two people, yet it appears person  has done so. It is not possible to achieve the input state.

'use strict';

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

// 1 2 5 3 7 8 6 4
// 1 2 3 5 7 8 6 4    /1x -- (3,5)
// 1 2 3 4 5 7 8 6    /4x - (4 , 8-4)
// 1 2 3 4 5 6 7 8    /2x -- (6, 8-6)

// 4 brided -4- times by (5,6,7,8)
// 3 brided -1- time by (5)
// 6 brided -1- time by (7)
// 7 brided -1- time by (8)

// 1 2 5 3 7 8 6 4
// 1 2 5 3 7 8 6 4
// 0 0 2-1 2 2 -1-4

//-4
// -1
// 2
// 2
// -1
// 2
// 0
// 0

// --------------
// 1 2 5 3_ 7 8 6 4 // 1
// 1 2 5 3 7_ 8 6 4 // 0
// 1 2 5 3 7 8_ 6 4 // 0
// 1 2 5 3 7 8 6_ 4 //2
// 1 2 5 3 7 8 6 4_ //4

// 1 2 3 4 5 6
// 3 1 2 4 5 6

//-4
//-1
//1
//2
//1
//0
//0
//0

// Complete the minimumBribes function below.

function minimumBribes(q) {
  // loop through array and use q[i]-1-i to identify who people they were bridbed.
  // if q[i]-1-i < 0 bridbing was involved. if q[i]-1-i=== 0 there could be bridbed involve too.

  let total = 0;
  for (let i = 0; i < q.length; i++) {
    let originalPos = q[i] - 1;
    if (originalPos - i > 2) {
      console.log('Too chaotic');
      return;
    } else if (originalPos - i <= 0) {
      for (let k = Math.max(q[i] - 2, 0); k < i; k++) {
        if (q[k] > q[i]) {
          total++;
        }
      }
    }
  }
  console.log(total);
}

//solution 2:

// function minimumBribes(q) {
//   let swaps = 0;
//   let min = q.length;
//   for (var i = q.length - 1; i >= 0; i--) {
//     if (q[i] - (i + 1) > 2) {
//       console.log(`Too chaotic`);
//       return;
//     }
//     if (q[i] > i + 1) {
//       swaps += q[i] - (i + 1);
//     } else {
//       if (min > q[i]) {
//         min = q[i];
//       } else if (q[i] != min) {
//         swaps++;
//       }
//     }
//   }
//   console.log(swaps);
// }

function main() {
  const t = parseInt(readLine(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine(), 10);

    const q = readLine()
      .split(' ')
      .map((qTemp) => parseInt(qTemp, 10));

    minimumBribes(q);
  }
}
