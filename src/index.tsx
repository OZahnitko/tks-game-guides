import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { gameGuidesTheme } from "tks-component-library";

import { store } from "@store";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <gameGuidesTheme.GlobalStyle />
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
