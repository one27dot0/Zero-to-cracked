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

// Practicing the readable and writable type of streams

/* const stream = require("stream");
const fs = require("fs");

const readableStreams = fs.createReadStream("./file.txt", {
  encoding: "utf-8",
  highWaterMark: 4,
});
const writableStreams = fs.createWriteStream("./file2.txt");

readableStreams.pipe(writableStreams); */

// Using stream in real work

const fs = require("fs");
const http = require("http");
const zlib = require("zlib");

/* const server = http.createServer((req, res) => {
  // 1. Serving large files over HTTP
  const readableStreams = fs.createReadStream("./file.txt");
  readableStreams.pipe(res);

  // 2. Processing uploads without buffering the whole payload
  req.pipe(fs.createWriteStream("./file2.txt"));

  // 3. Compression on the fly (Transform stream in the middle)

});

server.listen(3000); */

// Reading Chunks Manually especially when custom llogic is needed per chunks

/* const customStream = fs.createReadStream("./file.txt", { encoding: "utf-8" });

customStream.on("data", (chunk) => {
  console.log("Got a chunk", chunk.length, "bytes");
});

customStream.on("end", () => {
  console.log("No more data");
});

customStream.on("error", (err) => {
  console.error("Something broke: ", err);
}); */

// Using the .pipeline() method of chaining pipes becuase it is modern and hanldes errors

const { pipeline } = require("stream");
/* pipeline(
    fs.createReadStream('./file.txt'),
    zlib.createGzip(),
    fs.createWriteStream("./file.txt.gz"),
    (err) => {
        if (err) console.error("Pipeline failed: ", err);
        else console.log("Pipeline Succeeded");
    }
); */

// Using Pipeline to rewrite the stream

const server = http.createServer((req, res) => {
  pipeline(
    fs.createReadStream("./file.txt"),
    res,
    (err) => {
      if (err) console.error("Pipeline failed: ", err);
      else console.log("Pipeline Succeeded");
    },
  );
});

server.listen(3500);
