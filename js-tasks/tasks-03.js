// https://www.codewars.com/kata/geometry-basics-circle-circumference-in-2d/train/javascript

function circleCircumference(circle) {
  return 2 * Math.PI * circle.radius
}

// https://www.codewars.com/kata/training-js-number-12-loop-statement-for-dot-in-and-for-dot-of/train/javascript

function giveMeFive(obj) {
  const res = [];
  for (const key in obj) {
    if (key.length === 5) res.push(key);
    if (obj[key].length === 5) res.push(obj[key]);
  }

  return res;
}

// https://www.codewars.com/kata/understanding-closures-the-basics/train/javascript

function buildFun(n) {
  const res = [];
  
  for (let i = 0; i < n; i++) res.push(() => i);
  
  return res;
}

// https://www.codewars.com/kata/fun-with-es6-classes-number-2-animals-and-inheritance/train/javascript

class Shark extends Animal {
  constructor(name, age, status) {
    super(name, age, 0, 'shark', status);
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }
  
  introduce() {
    return super.introduce() + "  Meow meow!";
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
