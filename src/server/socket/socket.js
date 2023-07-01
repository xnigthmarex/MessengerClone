const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("input", (msg) => {
    console.log(msg)
    io.emit("update", msg);
  });
});

app.get("/api/socket", (req, res) => {
  res.send("socket");
});

http.listen(3001, () => {
  console.log("listening on *:3001");
});
