// Exercise for Day-02: Create a Node.js CLI script that generates a 500MB random text file, then streams it through a custom Transform stream that converts all text to uppercase, counts word frequencies, and pipes to a gzip compressed output file using stream.pipeline while keeping peak memory under 25MB.

"use strict";

const fs = require("fs");
const http = require("http");
const zlib = require("zlib");
const { pipeline } = require("stream");

// Creating a randon 500MB file

// The function below creates the needed 500mb file but the buffer allocates it all at once which beats the essence of streaming and might even crash the coputer if the size gets higher

/* function createLargeFile(fileName, sizeInBytes) {
  const buffer = Buffer.alloc(sizeInBytes);

  fs.writeFileSync(fileName, buffer);
  console.log("Successfully created a 500MB large file");
}

// Create 500mb file: 500 * 1024 * 1024
try {
  createLargeFile("500mb-large.txt", 524288000);
} catch (err) {
  console.error("It failed because: ", err);
}


const readableStreams = fs.createReadStream('./500mb-large.txt', {
  encoding: "utf-8",
}); */

// The stream version

function createLargeFile(filename, sizeInBytes) {
  const writeStream = fs.createWriteStream(filename);
  const chunkSize = 1024 * 1024; // equivalent to 1MB
  const chunk = Buffer.alloc(chunkSize, "a");
  let bytesWritten = 0;

  function writeChunk() {
    let canContinue = true;

    while (bytesWritten < sizeInBytes && canContinue) {
      const remaining = sizeInBytes - bytesWritten;
      const toWrite =
        remaining < chunkSize ? chunk.subarray(0, remaining) : chunk;

      canContinue = writeStream.write(toWrite);
      bytesWritten += toWrite.length;
    }

    if (bytesWritten >= sizeInBytes) {
      writeStream.end();
    } else {
      writeStream.once("drain", writeChunk);
    }
  }

  writeChunk();

  writeStream.on("finish", () => {
    console.log(
      `Successfully created a ${(sizeInBytes / (1024 * 1024)).toFixed(0)}MB large file`,
    );
  });

  writeStream.on("error", (err) => {
    console.error("Failed to write file: ", err);
  });
}

createLargeFile("500mb-large.txt", 524288000);

const readStream = fs.createReadStream("./500mb-large.txt", {encoding: "utf-8"});

