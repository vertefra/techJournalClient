import React from "react";
// npm install --save-dev @iconify/react @iconify/icons-bytesize
import { Icon, InlineIcon } from "@iconify/react";
import locationIcon from "@iconify/icons-bytesize/location";
import { Link } from "react-router-dom";

// pinstyle make sure that the pin doesnt move when zoom in or out
const pinStyle = {
  postion: "absolute",
  transform: "translate(-50%, -50%)",
};

export default function EventsLocationPin({ text, event_id }) {
  return (
    <Link from="*" to={`/events/${event_id}`}>
      <div style={pinStyle} className="location-pin">
        <Icon width={"40px"} icon={locationIcon} />
        <p className="pinLabel">{text}</p>
      </div>
    </Link>
  );
}
