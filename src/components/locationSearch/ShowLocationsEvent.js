import React, { useState, useContext, useEffect } from "react";
import Geolocate from "./component/GeoLocate";
import Map from "./component/Map";
import { UserContext } from "../../context/ContextStore";
import "./showLocationsEvents.css";

// mocck up locations... this will be loaded from the databse b

const locations = [
  {
    address: "location1",
    lat: 41,
    lng: -74,
  },
  {
    address: "location2",
    lat: 41.5,
    lng: -74.2,
  },
  {
    address: "location3",
    lat: 41.23,
    lng: -73.9999,
  },
];

// ============================================================

export default function ShowLocationsEvent() {
  const [loading, setLoading] = useState(true);
  const [userState] = useContext(UserContext);
  const [myLocation, updateMylocation] = useState({
    lat: "",
    lng: "",
    address: "Your Location",
  });

  const [eventsLocations, updateEventsLocations] = useState(locations);

  useEffect(() => {
    console.log(userState.location);
    if (!userState.location.lat && !userState.location.lon) {
      console.log("location not set");
    } else {
      console.log("location set ", userState.location);
      //updating location
      updateMylocation({
        ...myLocation,
        lat: userState.location.lat,
        lng: userState.location.lon,
      });
      setLoading(false);
    }
  }, [userState.location.lat, userState.location.lon]);

  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div>
      <Geolocate />
      <h1>geolocate</h1>
      <h4>I should have this stuff as well on the map</h4>
      <div id="mapBox">
        {loading === false ? (
          <Map
            myLocation={myLocation}
            eventsLocations={eventsLocations}
            zoomLevel={11}
            style={mapStyle}
          />
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
}
