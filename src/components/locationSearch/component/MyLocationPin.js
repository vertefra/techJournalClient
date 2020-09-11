import React from "react";
// npm install --save-dev @iconify/react @iconify/icons-bytesize
import { Icon, InlineIcon } from "@iconify/react";
import locationIcon from "@iconify/icons-bytesize/location";
const pinStyle = {
  postion: "absolute",
  transform: "translate(-50%, -50%)",
};

export default function MyLocationPin({ text }) {
  return (
    <div style={pinStyle} className="location-pin">
      <Icon width={"40px"} icon={locationIcon} />
      <p className="pinLabel">{text}</p>
    </div>
  );
}
