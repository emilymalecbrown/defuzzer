import React from "react";
import { Link, Flex } from "src/styled-components";
import { Settings } from "src/components/Settings";

export const Header = ({ themeToggler, isDark }) => {
  return (
    <Flex>
      <Link
        href="/"
        font={"bungee"}
        fontSize={"2em"}
        color={"inherit"}
        textDecoration={"none"}
      >
        defuzzer
      </Link>
      <Settings themeToggler={themeToggler} isDark={isDark} />
    </Flex>
  );
};
