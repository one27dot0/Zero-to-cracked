// Answer to the day 2 Exercise is here
"use strict";
const fs = require("fs");
const http = require("http");
const zlib = require("zlib");
const { Transform, pipeline } = require("stream");

// 1. Create a random .txt file size generator
function createLargeFile(fileName, desiredSize) {
  const writeStream = fs.createWriteStream(fileName);
  const chunkSize = 1024 * 1024; // Equals 1MB
  const chunk = Buffer.alloc(chunkSize, "a");

  let bytesWritten = 0;

  function writeChunk() {
    let canContinue = true;

    while (bytesWritten < desiredSize && canContinue) {
      const remaining = desiredSize - bytesWritten;
      const toWrite =
        remaining < chunkSize ? chunk.subarray(0, remaining) : chunk;

      canContinue = writeStream.write(toWrite);
      bytesWritten += toWrite.length;
    }

    if (bytesWritten >= desiredSize) {
      writeStream.end();
    } else {
      writeStream.once("drain", writeChunk);
    }
  }

  writeChunk();

  writeStream.on("finish", () => {
    console.log(`Successfully  finished creating ${fileName}`);
  });

  writeStream.on("error", (err) => {
    console.error(`Couldn't create the file properly: `, err);
  });
}

createLargeFile("500mb-large.txt", 524288000);

// 2. Read the file as a Stream
const readStream = fs.createReadStream("500mb-large.txt", {encoding: "utf-8"});
// 3. Pass it through a custom Transform Stream 

// 4. Pipe the output into gzip compression

// 5. Write the compressed result on disk

// 6. Write it all together with pipeline()
pipeline(
    /* readable, 
    custom Transform, 
    zlib.createGzip,
    writable, 
    callback */
);

// 7. Keep peak memory under 25MB