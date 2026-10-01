"use strict";

// Array destructuring
const alphabet = ["A", "B", "C", "D", "E", "F"];
const numbers = ["1", "2", "3", "4", "5", "6"];

const [a, b, c, ...rest] = alphabet;
// console.log(a, b, c);
// console.log(rest)

const newArray = [...alphabet, ...numbers];
// console.log(newArray);

// Object Destructuring
const personOne = {
  name: "Kyle",
  age: 24,
  address: {
    city: "Ilorin",
    state: "Really  don't know",
  },
};

const personTwo = {
  name: "Sally",
  age: 24,
  phoneNo: "08056543211",
  favoriteFood: "Rice & Beans",
  homeTown: "Abuja",
};

const personThree = { ...personOne, ...personTwo };
const {name, age} = personThree;
console.log(name, age);
//
// console.log(firstName, age);
// console.log(city, state);

// console.log(personThree);

function printUser({ name, age }) {
  console.log(`User Name is ${name}, and is ${age} years old`);
};

printUser(personThree);
