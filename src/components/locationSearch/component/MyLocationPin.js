import React from "react";
// npm install --save-dev @iconify/react @iconify/icons-si-glyph
import { Icon, InlineIcon } from "@iconify/react";
import pinLocation2 from "@iconify/icons-si-glyph/pin-location-2";

const pinStyle = {
  postion: "absolute",
  transform: "translate(-50%, -50%)",
};

const eventNameStyle = {
  backgroundColor: "rgba(185, 0, 255, 0.9",
  fontWeight: "900",
  color: "#1b0040",
  padding: "5px",
  fontSize: "12px",
  borderRadius: "5px",
};

export default function MyLocationPin({ text }) {
  return (
    <div style={pinStyle} className="location-pin">
      <Icon width={"40px"} icon={pinLocation2} color="#1b0040" />
      <p className="pinLabel" style={eventNameStyle}>
        {text}
      </p>
    </div>
  );
}
