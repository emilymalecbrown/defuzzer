import React, { createContext } from "react";
import io from "socket.io-client";
import { WS_BASE, WS_BASE_PRODUCTION } from "./config";
import { useDispatch } from "react-redux";
import {
  updateChatLog,
  updateUsers,
  setGameImages,
  setStartGame,
} from "./actions";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendMessage = (roomId, message) => {
    const payload = {
      roomId: roomId,
      data: message,
    };
    socket.emit("event://send-message", JSON.stringify(payload));
    dispatch(updateChatLog(payload));
  };

  const addUser = (roomId, username) => {
    const payload = {
      roomId,
      username,
    };

    socket.emit("event://user-connected", JSON.stringify(payload));
    dispatch(updateUsers(payload));
  };

  const startGame = () => {
    socket.emit("event://start-game");
  };

  if (!socket) {
    const api =
      process.env.NODE_ENV === "production" ? WS_BASE_PRODUCTION : WS_BASE;
    socket = io.connect(api);

    socket.on("event://get-message", (msg) => {
      const payload = JSON.parse(msg);
      dispatch(updateChatLog(payload));
    });

    socket.on("event://user-connected", (msg) => {
      const payload = JSON.parse(msg);
      dispatch(updateUsers(payload));
    });

    socket.on("event://user-left", (msg) => {
      const payload = JSON.parse(msg);
      dispatch(updateUsers(payload));
    });

    socket.on("event://set-game-images", (msg) => {
      const payload = JSON.parse(msg);
      dispatch(setStartGame());
      dispatch(setGameImages(payload));
    });

    ws = {
      socket: socket,
      sendMessage,
      addUser,
      startGame,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
