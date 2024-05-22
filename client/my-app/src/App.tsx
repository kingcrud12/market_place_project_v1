import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi welcome to my marketplace <code>src/App.tsx</code> and save to
          reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:3000/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here to see it
        </a>
      </header>
    </div>
  );
}

export default App;
