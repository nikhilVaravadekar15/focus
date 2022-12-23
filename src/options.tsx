import React from "react";
import ReactDOM from "react-dom";
import "./common.css"


function Options() {
  return (
    <div className="App">
      hello options page
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
