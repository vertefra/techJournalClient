import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import MyLocationPin from "./MyLocationPin";
import "./style/map.css";
import EventsLocationPin from "./EventsLocationsPin";

export default function Map({ myLocation, zoomLevel, eventsLocations }) {
  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          style={{ height: "100%", width: "100%" }}
          // bootstrapURLKeys={{ key }}
          defaultCenter={myLocation}
          defaultZoom={zoomLevel}
          controlSize="400px"
        >
          {eventsLocations.map((event, idx) => {
            return (
              <EventsLocationPin
                key={idx}
                lat={event.lat}
                lng={event.lng}
                text={event.address}
              />
            );
          })}
          <MyLocationPin
            lat={myLocation.lat}
            lng={myLocation.lng}
            text={myLocation.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}
