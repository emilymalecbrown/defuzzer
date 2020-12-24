const express = require("express");
const app = express();
// const expressWs = require('express-ws')(app);
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const cors = require("cors");
const uuidv4 = require("uuid").v4;

const rooms = {};
const chatLogs = {};

app.use(cors());

app.use(express.static(__dirname + "/public/build"));

app.get("/room", function (req, res, next) {
  const room = {
    name: req.query.name,
    id: uuidv4(),
  };
  rooms[room.id] = room;
  rooms[room.id].users = [];
  chatLogs[room.id] = [];

  res.json(room);
});

app.get("/room/:roomId", function (req, res, next) {
  const roomId = req.params.roomId;
  const response = {
    ...rooms[roomId],
    chats: chatLogs[roomId],
  };

  res.json(response);
});

io.on("connection", function (socket) {
  socket.on("event://send-message", function (msg) {
    const payload = JSON.parse(msg);
    if (chatLogs[payload.roomID]) {
      chatLogs[msg.roomID].push(payload.data);
    }

    socket.broadcast.emit("event://get-message", msg);
  });

  socket.on("event://user-connected", function (msg) {
    const { roomId, username } = JSON.parse(msg);

    if (rooms[roomId]) {
      rooms[roomId].users.push(username);

      io.emit(
        "event://user-connected",
        JSON.stringify({
          allUsers: rooms[roomId].users,
        })
      );
    }
  });
});

http.listen(process.env.PORT || 5000, function () {
  console.log(`listening on ${process.env.PORT || 5000}`);
});
