"use strict";

const fs = require("fs");

const createReadableStream = fs.createReadStream("./file.txt", {
  encoding: "utf-8",
  highWaterMark: 4,
});

const createWritableStream = fs.createWriteStream("./file2.txt");

createReadableStream.on("data", (chunk) => {
  console.log(chunk);
  createWritableStream.write(chunk);
});
