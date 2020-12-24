import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "src/globalStyles";
import { lightTheme, darkTheme } from "src/styled-components/themes";
import { Home } from "src/components/Home";
import WebSocketProvider from "src/WebSocket";
import store from "src/store";
import { ChatRoom } from "./components/ChatRoom";
import { Header } from "./components/Header";

function App() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";
  const themeToggler = () => {
    isDark ? setTheme("light") : setTheme("dark");
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <WebSocketProvider>
          <div className="App">
            <Header themeToggler={themeToggler} isDark={isDark} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/room/:id" element={<ChatRoom />}></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </WebSocketProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
