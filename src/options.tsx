import React from "react";
import ReactDOM from "react-dom";
import "./common.css"
import BlockSites from "./pages/blockSites/BlockSites";


function Options() {
  return (
    <div className="App">
      <BlockSites />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
