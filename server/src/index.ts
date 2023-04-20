const app = require("express");
const http = require("http");
const cors = require("cors");

const io = require("socket.io");

const server = http.createServer(app);
