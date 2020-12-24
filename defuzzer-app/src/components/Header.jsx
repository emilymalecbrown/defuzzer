import React from "react";
import { Link, Flex } from "src/styled-components";
import { Settings } from "src/components/Settings";

export const Header = ({ themeToggler, isDark }) => {
  return (
    <Flex>
      <Link href="/" font={"bungee"} fontSize={"32px"}>
        defuzzer
      </Link>
      <Settings themeToggler={themeToggler} isDark={isDark} />
    </Flex>
  );
};
