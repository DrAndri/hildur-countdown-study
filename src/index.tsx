import React from "react";
import ReactDOM from "react-dom/client";
import YZhanWeather from "yzhanweather";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const yzhanweather = new YZhanWeather();
yzhanweather.run("rain", {
  maxDuration: 10, // Default: 10s, this option can determine the speed of animations
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
