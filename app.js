const express = require('express');
const request = require('request-promise');
const http = require("http");
const fs = require('fs');
const counter = require('./counter.js');
const percentify = require('./percentify.js');
const makeHTML = require('./makeHTML.js');

const app = express();

module.exports = app;

// Sequences to count in string
const sequences = {
  ones: ['0', '1'],
  twos: ['00', '01', '10', '11'],
  threes: ['000', '001', '010', '011', '100', '101', '110', '111']
};

//to save counters
let sums = {
  sumOfOnes: [0, 0],
  sumOfTwos: [0, 0, 0, 0],
  sumOfThrees: [0, 0, 0, 0, 0, 0, 0, 0]
};

// Options to form GET request that will return 10000*25 = 250.000 binary strings
const options = {
  method: 'GET',
  uri: 'https://random.org/integers/',
  qs: {
    'num': 10000,  // Max value that allows API
    'min': 0,
    'max': (2**25)-1,   // Taking numbers from 000..00 to 111..11 with a length of 25 each
    'col': 10,
    'base': 2,
    'format': 'plain',
    'rnd': 'new'
  },
  json: true
};

// 4 requests to take 1.000.000 1s and 0s
console.log("Loading data from API...")
let promiseChain = [];
for (let i = 0; i < 4; i++) {
  promiseChain.push(request(options));
}

Promise.all(promiseChain)
    .then(
      response => {
        console.log('Data is loaded from API');
        let binString = normalizeBin(response.join());
        return binString;
      },
      error => {
        console.log('API returns error, taking values from file'); // Because of API limits the number of requests per day
        let fileContent = '';
        // If API rejects we take the same data from file that contains 250.000 binaries with spaces
        for (let i = 0; i < 4; i++) {
          fileContent += fs.readFileSync("bins.txt", "utf8");
        }
        let binString = normalizeBin(fileContent);
        return binString;
      })
    .then(binString => {
      sums.sumOfOnes = counter.countOccurrence(binString, sequences.ones, sums.sumOfOnes);
      sums.sumOfOnes = percentify.percentify(sums.sumOfOnes);

      sums.sumOfTwos = counter.countOccurrence(binString, sequences.twos, sums.sumOfTwos);
      sums.sumOfTwos = percentify.percentify(sums.sumOfTwos);

      sums.sumOfThrees = counter.countOccurrence(binString, sequences.threes, sums.sumOfThrees);
      sums.sumOfThrees = percentify.percentify(sums.sumOfThrees);
    })
    .then( () => {
      // Create HTTP server and listen on port 8000 for requests
      http.createServer(function(request, response) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      let str = makeHTML.makeHTML(sequences, sums);
      response.end(str);
      }).listen(8000);
      console.log('You can see answer at http://127.0.0.1:8000/');
    });

//deletes spaces from string
function normalizeBin (bin) {
  return bin.replace(/\n|\s/g, '');
}