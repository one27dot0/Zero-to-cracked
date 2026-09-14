"use strict";

const fs = require("fs");
const zlib = require("zlib");
const { Transform, pipeline } = require("stream");
const { bytes } = require("stream/consumers");

const SOURCE_FILE = "./source.txt";
const OUTPUT_FILE = "./output.txt.gz";

function generateFile(filename, requiredSize, callback) {
  const writeStream = fs.createWriteStream(filename);
  const words = [
    "apple",
    "watermelon",
    "pawpaw",
    "pineApple",
    "orange",
    "date",
  ];

  let bytesWritten = 0;

  function write() {
    let canWrite = true;

    while (bytesWritten < requiredSize && canWrite) {
      const line =
        Array.from(
          { length: 10 },
          () => words[Math.floor(Math.random() * words.length)],
        ).join(" ") + "\n";

      bytesWritten++;
      canWrite = writeStream.write(line);
    }

    if (bytesWritten < requiredSize) {
      writeStream.once("drain", write);
    } else {
      writeStream.end();
    }
  }

  writeStream.on("finish", callback);
  write();
}

// 2. The cutom transform Stream
class UpperCaseAndCountTrasnform extends Transform {
  constructor(options) {
    super(options);
    this.wordCounts = {};
    this.leftOver = "";
  }

  _transform(chunk, encoding, callback) {
    const text = this.leftOver + chunk.toString("utf-8");
    const lastBoundary = Math.max(
      text.lastIndexOf(" "),
      text.lastIndexOf("\n"),
    );

    if (lastBoundary === -1) {
      this.leftOver = text;
      return callback(null, "");
    }

    const completeChunk = text.slice(0, lastBoundary);
    this.leftOver = text.slice(lastBoundary + 1);

    const words = completeChunk.split(/\s+/).filter(Boolean);
    for (const word of words) {
      const lower = word.toLowerCase();
      this.wordCounts[lower] = (this.wordCounts[lower] || 0) + 1;
    }

    callback(null, completeChunk.toUpperCase() + " ");
  }

  _flush(callback) {
    if (this.leftOver.trim()) {
      const lastWord = this.leftOver.toLowerCase().trim();
      this.wordCounts[lastWord] = (this.wordCounts[lastWord] || 0) + 1;
      callback(null, this.leftOver.toUpperCase());
    } else {
      callback();
    }

    console.log("\n--- FINAL WORD COUNTS ---");
    console.log(this.wordCounts);
  }
}

// 3. Execution Pipeline
generateFile(SOURCE_FILE, 100000, () => {
  console.log("File generated. Streaming through pipeline...");

  const transform = new UpperCaseAndCountTrasnform();

  pipeline(
    fs.createReadStream(SOURCE_FILE),
    transform,
    zlib.createGzip(),
    fs.createWriteStream(OUTPUT_FILE),
    (err) => {
      if (err) {
        console.error("Pipeline failed: ", err);
      } else {
        const memMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        console.log(`Pipeline complete. Peak heap Used: ${memMB} MB`);
      }
    },
  );
});

generateFile("500mb-large.txt", 524288000, (err) => {
  console.error("Watchu say");
});
