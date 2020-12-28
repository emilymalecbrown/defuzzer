require("dotenv").config();

const express = require("express");
const app = express();
// const expressWs = require('express-ws')(app);
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const cors = require("cors");
const uuidv4 = require("uuid").v4;

const db = require("./db").db;

app.use(cors());

const roomsRef = db.ref("rooms");
const chatsRef = db.ref("chats");

app.get("/room", async (req, res) => {
  const roomId = uuidv4();

  await roomsRef.child(roomId).set({
    name: req.query.name,
    id: roomId,
    users: {},
  });
  await chatsRef.child(roomId).set([]);

  const roomSnapshot = await roomsRef.child(roomId).once("value");

  res.json(roomSnapshot.val());
});

app.get("/room/:roomId", async (req, res) => {
  const roomId = req.params.roomId;

  const roomSnapshot = await roomsRef.child(roomId).once("value");
  const chatSnapshot = await chatsRef.child(roomId).once("value");

  res.json({ room: await roomSnapshot.val(), chats: chatSnapshot.val() });
});

io.on("connection", function (socket) {
  socket.on("disconnecting", async () => {
    roomsRef.child(`${socket.roomId}/users/${socket.userId}`).remove();
    const roomSnapshot = await roomsRef.child(socket.roomId).once("value");

    io.emit(
      "event://user-connected",
      JSON.stringify({
        allUsers: roomSnapshot.val().users,
      })
    );
  });

  socket.on("event://send-message", async (msg) => {
    const { roomId, data } = JSON.parse(msg);

    db.ref(`chats/${roomId}`).push(data);

    socket.broadcast.emit("event://get-message", msg);
  });

  socket.on("event://user-connected", async (msg) => {
    const { roomId, username } = JSON.parse(msg);

    const newChild = await roomsRef.child(`${roomId}/users`).push(username);

    socket.userId = newChild.key;
    socket.roomId = roomId;

    const roomSnapshot = await roomsRef.child(roomId).once("value");

    io.emit(
      "event://user-connected",
      JSON.stringify({
        allUsers: roomSnapshot.val().users,
      })
    );
  });
});

http.listen(process.env.PORT || 5000, function () {
  console.log(`listening on ${process.env.PORT || 5000}`);
});
