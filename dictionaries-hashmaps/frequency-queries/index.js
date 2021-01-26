// You are given  queries. Each query is of the form two integers described below:
// -  : Insert x in your data structure.
// -  : Delete one occurence of y from your data structure, if present.
// -  : Check if any integer is present whose frequency is exactly . If yes, print 1 else 0.

// The queries are given in the form of a 2-D array  of size  where  contains the operation, and  contains the data element. For example, you are given array . The results of each operation are:

// Operation   Array   Output
// (1,1)       [1]
// (2,2)       [1]
// (3,2)                   0
// (1,1)       [1,1]
// (1,1)       [1,1,1]
// (2,1)       [1,1]
// (3,2)                   1
// Return an array with the output: .

// Function Description

// Complete the freqQuery function in the editor below. It must return an array of integers where each element is a  if there is at least one element value with the queried number of occurrences in the current array, or 0 if there is not.

// freqQuery has the following parameter(s):

// queries: a 2-d array of integers
// Input Format

// The first line contains of an integer , the number of queries.
// Each of the next  lines contains two integers denoting the 2-d array .

// Constraints

// All
// Output Format

// Return an integer array consisting of all the outputs of queries of type .

// Sample Input 0

// 8
// 1 5
// 1 6
// 3 2
// 1 10
// 1 10
// 1 6
// 2 5
// 3 2
// Sample Output 0

// 0
// 1
// Explanation 0

// For the first query of type , there is no integer whose frequency is  (). So answer is .
// For the second query of type , there are two integers in  whose frequency is  (integers =  and ). So, the answer is .

// Sample Input 1

// 4
// 3 4
// 2 1003
// 1 16
// 3 1
// Sample Output 1

// 0
// 1
// Explanation 1

// For the first query of type , there is no integer of frequency . The answer is . For the second query of type , there is one integer,  of frequency  so the answer is .

// Sample Input 2

// 10
// 1 3
// 2 3
// 3 2
// 1 4
// 1 5
// 1 5
// 1 4
// 3 2
// 2 4
// 3 2
// Sample Output 2

// 0
// 1
// 1
// Explanation 2

// When the first output query is run, the array is empty. We insert two 's and two 's before the second output query,  so there are two instances of elements occurring twice. We delete a  and run the same query. Now only the instances of  satisfy the query.

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}
// q (1, 5)
// q (1, 6)
// q (3, 2)
// q (1, 10)
// q (1, 6)

//count: {5:1,6:1,10:1}
//fre:{1:2,2:0}

// Time Complexity: O(q)
// Space Complexity: O(q)
function freqQuery(queries) {
  let result = [];
  let count = {};
  let freq = {};

  for (let q of queries) {
    let [operation, data] = q;
    switch (operation) {
      case 1:
        if (freq[count[data]]) {
          freq[count[data]]--;
        }
        count[data] = (count[data] || 0) + 1;
        freq[count[data]] = (freq[count[data]] || 0) + 1;
        break;
      case 2:
        if (count[data]) {
          freq[count[data]] = (freq[count[data]] || 0) - 1;
          count[data]--;
          freq[count[data]]++;
        }
        break;
      case 3:
        result.push(freq[data] > 0 ? 1 : 0);
        break;
    }
  }

  return result;
}

//++++++ better solution ++++++

// time complexity: O(q * dFreq)
// Space Complexity:  O(q * dFreq)
// This solution seems to be close to O(q) time and space complexity
function checkElFreq(dic, freq) {
  return dic[freq] && dic[freq].length > 0 ? 1 : 0;
}

function freqQuery(queries) {
  // dataByElKey: {1:2, 2:1, 3:2, 4:2}
  // dataByElFreq {1:[2], 2:[1,3,4]}
  let dataByElKey = {};
  let dataByElFreq = {};
  let out = [];
  for (let q of queries) {
    let op = q[0];
    let num = q[1];

    //dKey + dFreq*dKey.length = dKey *dFreq
    if (op === 1) {
      //insert integer to data structure;
      dataByElKey[num] = dataByElKey[num] || 0;

      if (dataByElFreq[dataByElKey[num]]) {
        dataByElFreq[dataByElKey[num]] = dataByElFreq[dataByElKey[num]].filter(
          (n) => n !== num
        ); //removing el from existing freq count;
      }
      dataByElKey[num]++;
      dataByElFreq[dataByElKey[num]] = dataByElFreq[dataByElKey[num]] || [];
      dataByElFreq[dataByElKey[num]].push(num);
    } else if (op === 2) {
      if (dataByElKey[num] && dataByElKey[num] > 0) {
        dataByElFreq[dataByElKey[num]] = dataByElFreq[dataByElKey[num]].filter(
          (n) => n !== num
        ); //removing el from existing freq count;
        dataByElKey[num]--;
        dataByElFreq[dataByElKey[num]] = dataByElFreq[dataByElKey[num]] || [];
        dataByElFreq[dataByElKey[num]].push(num);
      }
    } else if (op === 3) {
      out.push(checkElFreq(dataByElFreq, num));
    }
  }
  return out;
}

//++++++ naive approach ++++++
//do not pass all cases due to time complexity, searching a dic is too expensive

// Time Complexity: O(q^2)
// Space Complexity: O(q^2)

function checkElFreq(dic, freq) {
  for (let el in dic) {
    if (dic[el] === freq) {
      return 1;
    }
  }
  return 0;
}

// Complete the freqQuery function below.
function freqQuery(queries) {
  let data = {};
  let out = [];
  for (let q of queries) {
    let op = q[0];
    let num = q[1];
    if (op === 1) {
      //insert integer to data structure;
      data[num] = data[num] || 0;
      data[num]++;
    } else if (op === 2) {
      if (data[num] && data[num] > 0) {
        data[num]--;
      }
    } else if (op === 3) {
      out.push(checkElFreq(data, num));
    }
  }
  return out;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  let queries = Array(q);

  for (let i = 0; i < q; i++) {
    queries[i] = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map((queriesTemp) => parseInt(queriesTemp, 10));
  }

  const ans = freqQuery(queries);

  ws.write(ans.join('\n') + '\n');

  ws.end();
}
