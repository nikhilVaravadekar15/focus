import React from 'react'
import ReactDOM from "react-dom";
import "./common.css"
import Error from './pages/error/Error';

function Redirect() {
  return (
    <div>
      <Error />
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Redirect />
  </React.StrictMode>,
  document.getElementById("root")
);
