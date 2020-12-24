import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoom, joinRoom } from "src/actions";
import { Flex, Input } from "src/styled-components";

export const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEnter = (ev) => ev.key === "Enter";

  const handleEnterCreate = (ev) => {
    if (isEnter(ev)) {
      dispatch(createRoom(roomName, navigate));
    }
  };

  const handleEnterJoin = (ev) => {
    if (isEnter(ev)) {
      dispatch(joinRoom(roomId, navigate));
    }
  };

  return (
    <>
      <Flex flexDirection={"column"}>
        <div>
          <Input
            type="text"
            placeholder="Create New Room"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            onKeyPress={(e) => handleEnterCreate(e)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyPress={(e) => handleEnterJoin(e)}
          />
        </div>
      </Flex>
    </>
  );
};
