import { Application, Request, Response } from "express";

const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app: Application = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT: number | string = process.env.port || 5000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
