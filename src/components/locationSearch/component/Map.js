import React from "react";
import GoogleMapReact from "google-map-react";
import MyLocationPin from "./MyLocationPin";
import "./style/map.css";
import EventsLocationPin from "./EventsLocationsPin";

export default function Map({ myLocation, zoomLevel, eventsLocations }) {
  const KEY = process.env.REACT_APP_KEY;

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          style={{ height: "100%", width: "100%" }}
          bootstrapURLKeys={{ key: KEY }}
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
                place={event.name}
                event_id={event.event_id}
                event_name={event.event_name}
              />
            );
          })}
          <MyLocationPin
            lat={myLocation.lat}
            lng={myLocation.lng}
            text={myLocation.formatted_address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}
