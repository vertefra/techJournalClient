import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import "./map.css";

export default function Map({ location, zoomLevel }) {
  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          style={{ width: "100%", height: "500" }}
          // bootstrapURLKeys={{ key: key }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}
