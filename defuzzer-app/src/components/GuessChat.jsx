import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex } from "src/styled-components";

export const GuessChat = () => {
  const chats = useSelector((state) => state.chatLog);

  return (
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
  );
};
