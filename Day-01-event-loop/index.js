//Non-Blocking I/O operations

const fs = require("fs");

// fs.readFile("./file1.txt", "utf-8", (err, data) => {
//   // This runs later when ready
//   console.log(data);
// });

// console.log("This runs immediately while waiting for readfile to complete");

// Node Event loop phases

// console.log("1");
// setImmediate(() => {
//   console.log("2");
// });
// console.log("3");

// setTimeout(() => {
//   console.log("Timeout");
// }, 100);
// setImmediate(() => {
//   console.log("Immediate");
// });

// process.nextTick(() => {
//   console.log("NextTick");
// });
// Promise.resolve().then(() => {
//   console.log("Promise");
// });

// console.log("Sync First");

// Exercise 1.1 -

// console.log("The start of operation");

// setTimeout(() => {
//   console.log("What is your Opinion?");
// }, 0);

// fs.readFile("./file1.txt", "utf-8", (err, data) => {
//   console.log(`Answer the question ${data}`);

//   process.nextTick(() => {
//     console.log(`Sorry everyone, I can't see you all because I dey above una`);
//   });

//   Promise.resolve().then(() => {
//     console.log("Third in command here");
//   });
// });

// setImmediate(() => {
//   const name = "Muhammad Oniye";
//   console.log(name);
// });

// console.log(
//   "This is the end of the event loop tutorial and end of day 1, but somehow this comes second",
// );

// Tutorial Hell chackpoint - Event Loop Starvation

setTimeout(() => {
  console.log("SUCCESS: I was able to run!");
}, 1000);

fs.readFile("./file1.txt", "utf-8", (err, data) => {
  console.log("I/O finished!");
});

// Starvation triger
function starve() {
  Promise.resolve().then(() => {
    starve();
  });
}

console.log("Starting starvation test...");
starve();

