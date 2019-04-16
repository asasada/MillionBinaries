// Converts element to its ratio to sum of array's elements and adds to previous values
function percentify(arr) {
    let sum = arr.reduce(function(a, b) { return a + b; }, 0);
    for(let i = 0; i < arr.length; i++) {
      arr[i] = arr[i]/sum*100;
    }
  return arr;
}
module.exports.percentify = percentify;