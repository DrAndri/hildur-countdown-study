import React from "react";
import { numberWithCommas } from "./utils.tsx";

export const renderer = (props) => {
  if (props.completed) {
    // Render a completed state
    return "ÞÚ ERT BÚIN AÐ SKILA!!!";
  } else {
    // Render a countdown
    return (
      <span>
        {props.formatted.days} : {props.formatted.hours} :{" "}
        {props.formatted.minutes} : {props.formatted.seconds}
      </span>
    );
  }
};

export const renderSeconds = (props) => {
  if (props.completed) {
    return "ÞÚ ERT BÚIN AÐ SKILA!!!";
  } else {
    return <span>{numberWithCommas(props.total / 1000)}</span>;
  }
};
