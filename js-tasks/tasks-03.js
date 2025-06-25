// https://www.codewars.com/kata/geometry-basics-circle-circumference-in-2d/train/javascript

// -- Anna Snitko --
function circleCircumference(circle) {}

// -- Valentyn Tymofiiv --
function circleCircumference(circle) {
  return 2 * Math.PI * circle.radius
}

// https://www.codewars.com/kata/training-js-number-12-loop-statement-for-dot-in-and-for-dot-of/train/javascript

// -- Valentyn Tymofiiv --
function giveMeFive(obj) {
  const res = [];
  for (const key in obj) {
    if (key.length === 5) res.push(key);
    if (obj[key].length === 5) res.push(obj[key]);
  }

  return res;
const circleCircumference = circle => 2 * Math.PI * circle.radius;

// https://www.codewars.com/kata/training-js-number-12-loop-statement-for-dot-in-and-for-dot-of/train/javascript

// -- Anna Snitko --
function giveMeFive(obj) {
  var five = [];
  for (var key in obj) {
    if (key.length === 5) five.push(key);
    if (obj[key].length === 5) five.push(obj[key]);
  }
  return five;
}

// https://www.codewars.com/kata/understanding-closures-the-basics/train/javascript

// -- Valentyn Tymofiiv --
function buildFun(n) {
  const res = [];
  
  for (let i = 0; i < n; i++) res.push(() => i);
  
  return res;
// -- Anna Snitko --
function buildFun(n){
	let res = [];
	for (let i = 0; i < n; i++) res.push(() => i);
	return res;
}

// https://www.codewars.com/kata/fun-with-es6-classes-number-2-animals-and-inheritance/train/javascript

// -- Valentyn Tymofiiv --
class Shark extends Animal {
  constructor(name, age, status) {
    super(name, age, 0, 'shark', status);
// -- Anna Snitko --
class Shark extends Animal {
  constructor(name, age, status) {
    super(name, age, 0, "shark", status);
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }
  
  introduce() {
    return super.introduce() + "  Meow meow!";
    super(name, age, 4, "cat", status);
  }
  introduce() {
    return `${super.introduce()}  Meow meow!`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status); 
    this.master = master
  }
  
  greetMaster() {
    return `Hello ${this.master}`
  }
}
    super(name, age, 4, "dog", status);
    this.master = master;
  }
  greetMaster() {
    return `Hello ${this.master}`;
  }
}
