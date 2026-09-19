// Build an HTTP server using ony node inbuilt net module (Raw TCP socket).

"use strict";
const net = require("net");
const { json } = require("stream/consumers");

const PORT = 3000; // port
const HOST = "127.0.0.1"; // host address

// Utility Function to generate HTTP respsonse Strings
function sendHTTPResponse(
  socket,
  statusCode,
  statusText,
  headers = {},
  body = "",
) {
  const responseHeaders = {
    "Content-Type":
      typeof body === "object" ? "application/json" : "text/plain",
    "Content-Length": Buffer.byteLength(
      typeof body === "object" ? JSON.stringify(body) : body,
    ),
    Connection: "close",
    ...headers,
  };

  let headerString = `HTTP/1.1 ${statusCode} ${statusText}\r\n`;
  for (const [key, value] of Object.entries(responseHeaders)) {
    headerString += `${key}: ${value}\r\n`;
  }

  headerString += "\r\n"; // Blank Line Signaling the end of headers
  const responseBody = typeof body === "object" ? JSON.stringify(body) : body;

  socket.write(headerString + responseBody);
  socket.end(); // Close connection as Express handles it per request
}

// Creting server
const server = net.createServer((socket) => {
  console.log("you now requesting from the server");

  // Set Encoding to parse from buffer binaries to string
  socket.setEncoding("utf-8");

  // Listen to requests from client
  socket.on("data", (rawData) => {
    console.log("data recieved from client");

    try {
      // Split HTTP response into Headers and Body
      const [headerPart, bodyPart] = rawData.split("\r\n\r\n");
      if (!headerPart) return;

      const headerLines = headerPart.split("\r\n");
      const [method, url, httpVersion] = headerLines[0].split(" ");

      // Parse Headers into an object (Lowercase keys like express)
      const headers = {};
      for (let i = 1; i < headerLines.length; i++) {
        const line = headerLines[i];
        const colonIndex = line.indexOf(":");
        if (colonIndex !== -1) {
          const key = line.substring(0, colonIndex).trim().toLowerCase();
          const value = line.substring(colonIndex + 1).trim();
          headers[key] = value;
        }
      }

      // parse Body (JSON)
      let body = {};
      if (bodyPart && bodyPart.trim()) {
        const contentType = headers["content-type"] || ""; 
        if (contentType.includes("application/json")) {
            body = JSON.parse(bodyPart.trim());
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            body = Object.fromEntries(new URLSearchParams(bodyPart.trim()));
        }
      }

// ---- Routing Logic ----
      if (method === "GET" && url === "/status") {
        if (!body.name) {
            return sendHTTPResponse(socket, 200, "OK", {}, {"alive": true} );
        }
      }

    } catch (err) {}

    // Write to client
    socket.write();
  });

  // Handles Client disconnection
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  // Handles unexpected socket errors
  socket.on("error", (err) => {
    console.error(`Request error: ${err.message}`);
  });
});

// Launch server
server.listen(PORT, HOST, () => {
  console.log(`TCP server runnig`);
});

server.on("error", (err) => {
  console.error(`Error loading server: ${err.message}`);
});
