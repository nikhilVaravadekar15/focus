import React from 'react'
import ReactDOM from "react-dom";
import "./common.css"
import Incognito from './pages/incognito/Incognito';

function AllowInIncognito() {
  return (
    <div>
      <Incognito />
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <AllowInIncognito />
  </React.StrictMode>,
  document.getElementById("root")
);
