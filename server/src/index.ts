import { Application, Request, Response } from "express";
import type { CallUser } from "../global";

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

io.on("connection", (socket: any) => {
  socket.emit("host", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }: CallUser) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data: any) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
