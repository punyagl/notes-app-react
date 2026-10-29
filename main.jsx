import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import ThemeProvider from "./Theme_context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);