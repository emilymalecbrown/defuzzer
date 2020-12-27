import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { WebSocketContext } from "src/WebSocket";
import { setUsername, joinRoom } from "src/actions";
import { Box, Flex, Input } from "src/styled-components";

export const ChatRoom = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [msgInput, setMsgInput] = useState("");

  const room = useSelector((state) => state.room);
  const username = useSelector((state) => state.username);
  const chats = useSelector((state) => state.chatLog);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  const isEnter = (ev) => ev.key === "Enter";

  const sendMessage = () => {
    ws.sendMessage(room.id, {
      username: username,
      message: msgInput,
    });
    setMsgInput("");
  };

  const handleEnterRoom = (ev) => {
    if (isEnter(ev)) {
      dispatch(setUsername(usernameInput));
      ws.addUser(room.id, usernameInput);
    }
  };

  const handleSendMessage = (ev) => {
    if (isEnter(ev)) sendMessage();
  };

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!room) {
      dispatch(joinRoom(params.id, navigate));
    }
  }, [room, params, navigate, dispatch]);

  if (!room) return null;

  return (
    <div>
      <Flex>
        <h1>
          {room.name} ({room.id})
        </h1>
      </Flex>
      {!username && (
        <Flex>
          <Input
            type="text"
            placeholder="Enter username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyPress={(ev) => handleEnterRoom(ev)}
          />
        </Flex>
      )}
      {username && (
        <div>
          <Flex justifyContent={"space-between"}>
            <div>
              <ul>
                {users &&
                  users.map((user, index) => (
                    <li key={`${user}-${index}`}>{user}</li>
                  ))}
              </ul>
            </div>
            <Box width={"60%"}>
              {chats.map((c, i) => (
                <Flex
                  key={i}
                  display={"flex"}
                  flexDirection={"column-reverse"}
                  alignItems={"start"}
                >
                  {c.username}: {c.message}
                </Flex>
              ))}
            </Box>
            <div></div>
          </Flex>
          <Flex>
            <Input
              type="text"
              placeholder={"Guess away"}
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              onKeyPress={(e) => handleSendMessage(e)}
            />
          </Flex>
        </div>
      )}
    </div>
  );
};
