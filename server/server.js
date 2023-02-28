const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const { addUser, getUser, getUsersInRoom } = require("./users.js");

require("dotenv").config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["*"],
  },
});

io.on("connection", (socket) => {
  console.log("new connection !!");

  socket.on("join_room", (username, room) => {
    console.log("just join room " + room);

    socket.join(room);

    // say user joined
    socket.emit("message", {
      user: "admin",
      text: `${username} has joined the room ${room}`,
    });

    socket.broadcast.to(room).emit("message", {
      user: "admin",
      text: `${username} has joined the room ${room}`,
    });
  });

  /**
   * 게임생성
   */
  socket.on("generate_game", (room, matrix) => {
    // socket.broadcast.to(room).emit("get_game", matrix);

    console.log(`join room : ${room}`, matrix);

    // io.emit("generate_game", "everyone"); // short form

    io.to(room).emit("generate_game", matrix);
  });

  socket.on("generate_alphabet_ game", (room, alphabet) => {
    socket.broadcast.to(room).emit("get_1game", alphabet);
    console.log("????????????? " + room, alphabet);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, " is disconnected");
  });

  socket.on("disconnect", () => {
    console.log("Leave Socket");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});