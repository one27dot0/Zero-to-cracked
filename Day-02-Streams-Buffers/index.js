"use strict";

// Binary Data, buffers and NodeJS Streams

// const buffer = new Buffer.from("Vishwas", "utf-8");

// buffer.write("Just Code");

// console.log(buffer.toJSON());
// console.log(buffer);
// console.log(buffer.toString());

// Using fs module with stream

// const fs = require("fs");
// const zlib = require("zlib");

// const readableStream = fs.createReadStream("./file.txt", {
//   encoding: "utf-8",
//   highWaterMark: 5,
// });

// const writeableStream = fs.createWriteStream("./file2.txt");

// readableStream.on("data", (chunk) => {
//   console.log(chunk);
//   writeableStream.write(chunk);
// });

// PIPES
// readableStream.pipe(writeableStream);

// Using the DOcs

const stream = require("stream");
const fs = require("fs");

const readableStreams = fs.createReadStream("./file.txt", {
  encoding: "utf-8",
  highWaterMark: 4,
});
const writableStreams = fs.createWriteStream("./file2.txt");

readableStreams.on("data", (chunk) => {
  // console.log(chunk);
  writableStreams.write(chunk);
});
