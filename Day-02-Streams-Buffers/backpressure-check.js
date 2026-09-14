"use strict";
const fs = require("fs");
const stream = fs.createWriteStream("drain-tes.txt", { highWaterMark: 1024 });

let drainCount = 0;
let i = 10000;

function write() {
  let ok = true;
  while (i > 0 && ok) {
    i--;

    ok = stream.write(`Line ${i}: backend engineering discipline\n`);
  }
  if (i > 0) {
    drainCount++;
    stream.once('drain', write);
  } else {
    stream.end();
  }
}

stream.on('finish', ()=> {
    console.log(`Finished! Drain event fired ${drainCount} times.`);
});

write();
