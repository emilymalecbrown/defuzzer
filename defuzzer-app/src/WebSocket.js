import React, { createContext } from "react";
import io from "socket.io-client";
import { WS_BASE } from "./config";
import { useDispatch } from "react-redux";
import { updateChatLog, updateUsers } from "./actions";

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

  if (!socket) {
    socket = io.connect(WS_BASE);

    socket.on("event://get-message", (msg) => {
      const payload = JSON.parse(msg);
      dispatch(updateChatLog(payload));
    });

    socket.on("event://user-connected", (msg) => {
      console.log(msg);
      const payload = JSON.parse(msg);
      console.log("IN THE ON EVENT");
      dispatch(updateUsers(payload));
    });

    ws = {
      socket: socket,
      sendMessage,
      addUser,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
