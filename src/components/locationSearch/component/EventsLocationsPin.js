import React from "react";
// npm install --save-dev @iconify/react @iconify/icons-bytesize
import { Icon, InlineIcon } from "@iconify/react";
import locationIcon from "@iconify/icons-bytesize/location";

export default function EventsLocationPin({ text }) {
  return (
    <div className="location-pin">
      <Icon width={"40px"} icon={locationIcon} />
      <p className="pinLabel">{text}</p>
    </div>
  );
}
