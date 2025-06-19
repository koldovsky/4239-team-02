// 1. Messi Goals
// https://www.codewars.com/kata/grasshopper-messi-goals-function/train/javascript

// -- Valentyn Tymofiiv --
function goals(laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
  return laLigaGoals + copaDelReyGoals + championsLeagueGoals;
}

// -- Snitko Anna --
const goals = (laLigaGoals, copaDelReyGoals, championsLeagueGoals) => laLigaGoals + copaDelReyGoals + championsLeagueGoals;

// 2. Make negative
// https://www.codewars.com/kata/55685cd7ad70877c23000102/train/javascript

// -- Valentyn Tymofiiv --
function makeNegative(num) {
  return num > 0 ? -num : num;
}

// -- Snitko Anna --
const makeNegative = num => num > 0 ? -num : num;

// 3. Game Move
// https://www.codewars.com/kata/grasshopper-terminal-game-move-function/train/javascript

// -- Valentyn Tymofiiv --
function move(position, roll) {
  return position + roll * 2;
}

// -- Snitko Anna --
const move = (position, roll) => position + roll * 2;

// 4. Personalized Message
// https://www.codewars.com/kata/grasshopper-personalized-message/train/javascript

// -- Valentyn Tymofiiv --
function greet(name, owner) {
  return name === owner ? "Hello boss" : "Hello guest";
}

// -- Snitko Anna --
const greet = (name, owner) => name === owner ? "Hello boss" : "Hello guest";

// 5. Keep Hydrated
// https://www.codewars.com/kata/keep-hydrated-1/train/javascript

// -- Valentyn Tymofiiv --
function litres(time) {
  return Math.floor(time * 0.5);
}

// -- Snitko Anna --
const litres = (time) => Math.floor(time * 0.5);

// 6. Opposites Attract
//https://www.codewars.com/kata/555086d53eac039a2a000083/train/javascript

// -- Valentyn Tymofiiv --
function lovefunc(flower1, flower2) {
  return (flower1 + flower2) % 2 === 1;
}

// -- Snitko Anna --
const lovefunc = (f1, f2) => (f1 + f2) % 2 === 1;
