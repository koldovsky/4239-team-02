// ---БАЗОВІ ЗАДАЧІ---
// 1. https://www.codewars.com/kata/convert-a-string-to-an-array/train/javascript

// -- Anna Snitko --
const stringToArray = string => string.split(' ');

// -- Iryna Zhmailo --
function stringToArray(string) {
  return string.split(" ");
}
console.log(stringToArray("Robin Singh")); 

// 2. https://www.codewars.com/kata/dna-to-rna-conversion/train/javascript

// -- Iryna Zhmailo --
function DNAtoRNA(dna) {
  return dna.replaceAll("T", "U");
}
console.log(DNAtoRNA("GCAT"));

// -- Anna Snitko --
const DNAtoRNA = dna => dna.replace(/T/g, 'U');

// ---ПОГЛИБЛЕНІ ЗАДАЧІ---
// 1. https://www.codewars.com/kata/577a98a6ae28071780000989/train/javascript

// -- Iryna Zhmailo --
var min = function (list) {
  return Math.min(...list);
};
var max = function (list) {
  return Math.max(...list);
};

// -- Anna Snitko --
var min = function(list){
    return Math.min(...list)
}
var max = function(list){
    return Math.max(...list)
}

// 2. https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript

// -- Anna Snitko --
function min(arr, toReturn) { 
  const minValue = Math.min(...arr);
  return toReturn === 'value' ? minValue : arr.indexOf(minValue);
}

// -- Iryna Zhmailo --
function min(arr, toReturn) {
 const smallest = Math.min(...arr);
 if (toReturn === "value") {
  return smallest;
 } else {
  return arr.indexOf(smallest);
 }
}
// ---ДОДАТКОВІ ЗАДАЧІ---
// 1. https://www.codewars.com/kata/53ee5429ba190077850011d4/train/javascript

// -- Anna Snitko --
function doubleInteger(i) {
  return i * 2;
}

// -- Iryna Zhmailo --
function doubleInteger(i) {
 return i * 2;
}
// 2. https://www.codewars.com/kata/5b853229cfde412a470000d0/train/javascript

// -- Anna Snitko --
function twiceAsOld(dadYearsOld, sonYearsOld) {
  return Math.abs(dadYearsOld - 2 * sonYearsOld);
}

// -- Iryna Zhmailo --
function twiceAsOld(dadYearsOld, sonYearsOld) {
 return Math.abs(dadYearsOld - 2 * sonYearsOld)
}
// 3. https://www.codewars.com/kata/5933a1f8552bc2750a0000ed/train/javascript

// -- Anna Snitko --
function nthEven(n){
  return (n - 1) * 2;
}

// -- Iryna Zhmailo --
function nthEven(n){
  return (n - 1) * 2;
}
// 4. https://www.codewars.com/kata/574b3b1599d8f897470018f6/train/javascript

// -- Anna Snitko --
function getRealFloor(n) {
  if (n <= 0) return n;
  if (n >= 13) return n - 2;
  return n - 1;
}

// -- Iryna Zhmailo --
function getRealFloor(n) {
  if (n <= 0) return n;
  if (n < 13) return n - 1;
  return n - 2;
}
// 5. https://www.codewars.com/kata/55f9bca8ecaa9eac7100004a/train/javascript

// -- Anna Snitko --
function past(h, m, s){
  return ((h * 3600) + (m * 60) + s) * 1000;
}

// -- Iryna Zhmailo --
function past(h, m, s) {
  if (h < 0 || h > 23) return 0;
  if (m < 0 || m > 59) return 0;
  if (s < 0 || s > 59) return 0;
  return (s + m * 60 + h * 3600) * 1000;
}
// 6. https://www.codewars.com/kata/5545f109004975ea66000086/train/javascript

// -- Anna Snitko --
function isDivisible(n, x, y) {
  return n % x === 0 && n % y === 0;
}

// -- Iryna Zhmailo --
function isDivisible(n, x, y) {
  if (n % x === 0 && n % y === 0) return true;
  return false;
}
