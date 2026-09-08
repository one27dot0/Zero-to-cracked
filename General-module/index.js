// This modules ciontains different practices outside of the other folders

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
