import React from "react";
// npm install --save-dev @iconify/react @iconify/icons-bytesize
// npm install --save-dev @iconify/react @iconify/icons-si-glyph
import "./style/pinEvent.css";
import { Icon, InlineIcon } from "@iconify/react";
import pinLocation1 from "@iconify/icons-si-glyph/pin-location-1";

import { Link } from "react-router-dom";

// pinstyle make sure that the pin doesnt move when zoom in or out
const pinStyle = {
  postion: "absolute",
  transform: "translate(-50%, -50%)",
};

const eventNameStyle = {
  backgroundColor: "rgba(185, 0, 255, 1",
  fontWeight: "900",
  color: "#1b0040",
  // color: "white",
  padding: "5px",
  fontSize: "13px",
  borderRadius: "5px",
  textStyle: "none",
};

const locationStyle = {
  textDecoration: "underline",
  width: "100%",
  fontSize: "12px",
  fontWeight: "900",
};

export default function EventsLocationPin({ event_name, place, event_id }) {
  return (
    <div style={pinStyle} className="location-pin">
      <Icon width={"40px"} icon={pinLocation1} color="red" />
      <Link from="*" to={`/events/${event_id}`}>
        <h5 className="pinEvent">{event_name}</h5>
      </Link>
      <p className="pinLabel" style={locationStyle}>
        {place}
      </p>
    </div>
  );
}
