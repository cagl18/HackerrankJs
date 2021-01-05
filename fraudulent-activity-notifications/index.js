// HackerLand National Bank has a simple policy for warning clients about possible fraudulent account activity. If the amount spent by a client on a particular day is greater than or equal to  the client's median spending for a trailing number of days, they send the client a notification about potential fraud. The bank doesn't send the client any notifications until they have at least that trailing number of prior days' transaction data.

// Given the number of trailing days  and a client's total daily expenditures for a period of  days, find and print the number of times the client will receive a notification over all  days.

// For example,  and . On the first three days, they just collect spending data. At day , we have trailing expenditures of . The median is  and the day's expenditure is . Because , there will be a notice. The next day, our trailing expenditures are  and the expenditures are . This is less than  so no notice will be sent. Over the period, there was one notice sent.

// Note: The median of a list of numbers can be found by arranging all the numbers from smallest to greatest. If there is an odd number of numbers, the middle one is picked. If there is an even number of numbers, median is then defined to be the average of the two middle values. (Wikipedia)

// Function Description

// Complete the function activityNotifications in the editor below. It must return an integer representing the number of client notifications.

// activityNotifications has the following parameter(s):

// expenditure: an array of integers representing daily expenditures
// d: an integer, the lookback days for median spending
// Input Format

// The first line contains two space-separated integers  and , the number of days of transaction data, and the number of trailing days' data used to calculate median spending.
// The second line contains  space-separated non-negative integers where each integer  denotes .

// Constraints

// Output Format

// Print an integer denoting the total number of times the client receives a notification over a period of  days.

// Sample Input 0

// 9 5
// 2 3 4 2 3 6 8 4 5
// Sample Output 0

// 2
// Explanation 0

// We must determine the total number of  the client receives over a period of  days. For the first five days, the customer receives no notifications because the bank has insufficient transaction data: .

// On the sixth day, the bank has  days of prior transaction data, , and  dollars. The client spends  dollars, which triggers a notification because : .

// On the seventh day, the bank has  days of prior transaction data, , and  dollars. The client spends  dollars, which triggers a notification because : .

// On the eighth day, the bank has  days of prior transaction data, , and  dollars. The client spends  dollars, which does not trigger a notification because : .

// On the ninth day, the bank has  days of prior transaction data, , and a transaction median of  dollars. The client spends  dollars, which does not trigger a notification because : .

// Sample Input 1

// 5 4
// 1 2 3 4 4
// Sample Output 1

// 0
// There are  days of data required so the first day a notice might go out is day . Our trailing expenditures are  with a median of  The client spends  which is less than  so no notification is sent.

///////////////////////////////////////////////////////
// process.stdin.on('data', (inputStdin) => {
//   inputString += inputStdin;
// });

// process.stdin.on('end', (_) => {
//   inputString = inputString
//     .replace(/\s*$/, '')
//     .split('\n')
//     .map((str) => str.replace(/\s*$/, ''));

//   main();
// });

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
fs.readFile('input', 'utf8', function (err, data) {
  inputString = data
    .replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function getMedian(arr, days) {
  //debits [2, 3, 4, 2, 3]
  //countArr = [0,0,2,2,1]
  //accArr = [0,0,2,4,5]
  //sorted = [2,2,3,3,4]
  let sum = 0,
    prevIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    // console.log('sum',sum,'i',i,'prevIndex',prevIndex);
    if (sum === days / 2) return (i + i + 1) / 2; //even case
    if (sum > days / 2) return i; //odd case
    prevIndex = i;
  }
}

// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
  let notify = 0;
  let countArr = new Array(201).fill(0);

  for (let i = 0; i < d; i++) {
    countArr[expenditure[i]]++;
  }

  for (let i = d; i < expenditure.length; i++) {
    //getMedian
    let median = getMedian(countArr, d);
    // console.log('median', median);
    if (expenditure[i] >= 2 * median) notify++;
    countArr[expenditure[i]]++;
    countArr[expenditure[i - d]]--;
  }

  return notify;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const nd = readLine().split(' ');

  const n = parseInt(nd[0], 10);

  const d = parseInt(nd[1], 10);

  const expenditure = readLine()
    .split(' ')
    .map((expenditureTemp) => parseInt(expenditureTemp, 10));

  let result = activityNotifications(expenditure, d);

  ws.write(result + '\n');

  ws.end();
}
