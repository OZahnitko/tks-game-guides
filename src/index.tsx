import React from "react";
import ReactDOM from "react-dom";
import { gameGuidesTheme } from "tks-component-library";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <gameGuidesTheme.GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
