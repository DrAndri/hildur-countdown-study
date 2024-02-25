import React from "react";
import "./TextSection.css";

export default function TextSection(props: {
  text: string;
  fontSize?: string;
}) {
  return (
    <div className="component text-section">
      <div style={props.fontSize ? { fontSize: props.fontSize } : {}}>
        {props.text}
      </div>
    </div>
  );
}
