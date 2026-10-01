/* // JavaScript Promises, async and await
"use strict";

let promise = new Promise((resolve, reject) => {
  let a = 5 * 3;
  if (a === 15) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

promise
  .then((message) => {
    console.log(`This is from inside the then the promise state is ${message}`);
  })
  .catch((message) => {
    console.log(`This is from catch and this means the operation ${message}`);
  });

// An example of a Callback
const userLeft = true;
const userrWatchingCatMeme = false;

function watchingTutorialCallback(callback, errorCallback) {
  if (userLeft) {
    errorCallback({
      name: "User Left",
      message: ":(",
    });
  } else if (userrWatchingCatMeme) {
    errorCallback({
      name: "User watching cat meme",
      message: "WebDevSimplified < Cat",
    });
  } else {
    callback("Thumbs up and Subscribe");
  }
}

watchingTutorialCallback(
  (message) => {
    console.log("Success: " + message);
  },
  (error) => {
    console.log(error.name + " " + error.message);
  },
);

// Using Promises instead of callbacks
function watchingTutorialPromise() {
  return new Promise((resolve, reject) => {
    if (userLeft) {
      reject({ name: "User actually left", message: ":)" });
    } else if (userrWatchingCatMeme) {
      reject({
        name: "User is currently watching cat meme",
        message: "Muhammad > cat",
      });
    } else {
      resolve("Thumbs up and subscribe");
    }
  });
}

watchingTutorialPromise()
  .then((message) => {
    console.log("Success " + message);
  })
  .catch((error) => {
    console.log(error.name + " " + error);
  });
 */

// Promise.all and promise.race

/* const recordVideo1 = new Promise((resolve, reject) => {
  resolve("Video 1 Playback Error");
});

const recordVideo2 = new Promise((resolve, reject) => {
  resolve("Video 2 Playback Error");
});

const recordVideo3 = new Promise((resolve, reject) => {
  resolve("Video 3 Playback Error");
});

Promise.all([recordVideo1, recordVideo2, recordVideo3])
  .then((messages) => {
    console.log(messages);
  })
  .catch((messages) => {
    console.log(messages);
  }); */

  // Async Await
  
