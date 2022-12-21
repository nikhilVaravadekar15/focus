import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./pages/main/Main";
import "./popup.css"


function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
