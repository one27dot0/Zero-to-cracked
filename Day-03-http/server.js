// Architecture for Creating a server using the node inbuilt net

"use strict";
// Import the built in module
const net = require("net");

//Define port and server host
const port = 3000;
const HOST = "127.0.0.1";

// Utility Function to generate HTTP respsonse Strings
function sendHTTPResponse(
  socket,
  statusCode,
  statusText,
  headers = {},
  body = "",
) {
  const isObject = typeof body === "object";
  const responseBody = isObject ? JSON.stringify(body) : body;

  const responseHeaders = {
    "Content-Type": isObject ? "application/json" : "text/plain",
    "Content-Length": Buffer.byteLength(responseBody),
    Connection: "close",
    ...headers,
  };

  let headerString = `HTTP/1.1 ${statusCode} ${statusText}\r\n`;
  for (const [key, value] of Object.entries(responseHeaders)) {
    headerString += `${key}: ${value}\r\n`;
  }

  headerString += "\r\n"; // Blank Line Signaling the end of headers

  socket.write(headerString + responseBody);
  socket.end(); // Close connection as Express handles it per request
}

// Parse raw request bytes into { method, path, httpVersion, headers, body }
function parseHTTPRequest(rawData) {
  const headerIndex = rawData.indexOf("\r\n\r\n");
  if (headerIndex === -1) return null;

  const headerPart = rawData.slice(0, headerIndex);
  const bodyPart = rawData.slice(headerIndex + 4);

  const lines = headerPart.split("\r\n");
  const [method, path, httpVeersion] = lines[0].split(" ");

  const headers = {};
  for (let i = 0; i < lines.length; i++) {
    const idx = lines[i].indexOf(":");
    if (idx === -1) continue;
    const key = lines[i].slice(0, idx).trim().toLowerCase();
    const value = lines[i].slice(idx + 1).trim();
    headers[key] = value;
  }

  return { method, path, httpVeersion, headers, body: bodyPart };
}

// Create TCP server
const server = net.createServer((socket) => {
  console.log(
    `Client connected from: ${socket.remoteAddress}:${socket.remotePort} `,
  );

  // Set encoding so data arrives as a String rather than raw buffer binaries
  socket.setEncoding("utf-8");

  let rawData = "";

  // Listen for data chunks sent by the client
  socket.on("data", (chunk) => {
    rawData += chunk;

    const request = parseHTTPRequest(rawData);
    if (!request) return;

    const contentLength = parseInt(
      request.headers["content-length"] || "0",
      10,
    );
    if (Buffer.byteLength(request.body) < contentLength) return;

    console.log(`${request.method} ${request.path}`);

    // Basic Routing
    if (request.path === "/" && request.method === "GET") {
      sendHTTPResponse(
        socket,
        200,
        "OK",
        {},
        "Hello From netbased HTTP server!",
      );
    } else if (request.path === "/status" && request.method === "GET") {
      sendHTTPResponse(socket, 200, "OK", {}, { alive: true });
    } else {
      sendHTTPResponse(
        socket,
        404,
        "page not found!",
        {},
        "ROute missing, can not be found",
      );
    }
  });

  // Handles client disconnection
  socket.on("end", () => {
    console.log(`Client disconnected.`);
  });

  // Handle enexpected socket errors (e.g., client suddenly closes connection)
  socket.on("error", (err) => {
    console.error(`Socket Error ${err.message}`);
  });
});

// Start the server and listen on the specified port

server.listen(port, HOST, () => {
  console.log(`TCP server is running on ${HOST}:${port}`);
});

// Handle Global server errors
server.on("error", (err) => {
  console.error(`Server error: ${err.message}`);
});
