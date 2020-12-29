import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { WebSocketContext } from "src/WebSocket";
import { setUsername, joinRoom } from "src/actions";
import { Flex, Input } from "src/styled-components";
import { Participants } from "src/components/Participants";
import { GuessChat } from "./GuessChat";

export const Game = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [msgInput, setMsgInput] = useState("");

  const room = useSelector((state) => state.room);
  const username = useSelector((state) => state.username);
  const gameStarted = useSelector((state) => state.gameStarted);

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

  const handleStartGame = (ev) => {
    if (!gameStarted) {
      ws.startGame();
    }
  };

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!room) {
      dispatch(joinRoom(params.id, navigate));
    }
  }, [room, params, navigate, dispatch]);

  if (!room) return <h1>Oops, cannot find this game.</h1>;

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
        <>
          <Participants />
          {!gameStarted && (
            <button onClick={(ev) => handleStartGame(ev)}>Start Game</button>
          )}
          <GuessChat />
          <Input
            type="text"
            placeholder={"Guess away"}
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            onKeyPress={(e) => handleSendMessage(e)}
          />
        </>
      )}
    </div>
  );
};
