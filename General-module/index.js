"use strict";

const fs = require("fs");
const zlib = require("zlib");
const { Transform, pipeline } = require("stream");

/* // This modules ciontains different practices outside of the other folders

const fs = require("fs/promises");

console.log("Log this first");

// fs.readFile('file.txt', 'utf-8')
// .then((data) => console.log(data))
// .catch((error) => console.log(error));

async function readFile() {
  try {
    const data = await fs.readFile("file.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

readFile();

console.log("Does this log next?");
console.log("Muhammad Oniye");
 */

/* const UpperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperChunk = chunk.toString().toUpperCase();
    callback(null, upperChunk);
  },
});

process.stdin.pipe(UpperCaseTransform).pipe(process.stdout); */

// Day 02 assignment with AI

function generateFile(filename, requiredSize, callback) {
  const words = [
    "apple",
    "banana",
    "orange",
    "apple",
    "cherry",
    "date",
    "fig",
    "pawpaw",
  ];
  const writeStreams = fs.createWriteStream(filename);
  let bytesWritten = 0;

  function write() {
    let canWrite = true;
    while (bytesWritten < requiredSize && canWrite) {
      const line = Array.from({length: 10}, () => words.[Math.floor(Math.random() * words.length)]).join(" ") + "\n";
      bytesWritten ++;
      
    }
  }
}
