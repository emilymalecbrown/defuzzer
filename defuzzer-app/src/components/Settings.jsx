import React from "react";
import { Fieldset } from "src/styled-components";

export const Settings = ({ themeToggler, isDark }) => (
  <>
    <Fieldset>
      <legend>Theme</legend>
      <input
        type="radio"
        id="dark-mode-on"
        name="dark-mode"
        value="on"
        checked={isDark}
        onChange={themeToggler}
      />
      <label htmlFor="dark-mode-on">dark</label>
      <input
        type="radio"
        id="dark-mode-off"
        name="dark-mode"
        value="off"
        checked={!isDark}
        onChange={themeToggler}
      />
      <label htmlFor="dark-mode-off">light</label>
    </Fieldset>
  </>
);
