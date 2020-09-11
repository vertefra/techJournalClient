import React, { useState, useContext, useEffect } from "react";
import Geolocate from "./component/GeoLocate";
import Map from "./component/Map";
import { UserContext } from "../../context/ContextStore";
import "./showLocationsEvents.css";
import { server } from "../../setting";

// mocck up locations... this will be loaded from the databse b

// const locations = [
//   {
//     address: "location1",
//     lat: 41,
//     lng: -74,
//   },
//   {
//     address: "location2",
//     lat: 41.5,
//     lng: -74.2,
//   },
//   {
//     address: "location3",
//     lat: 41.23,
//     lng: -73.9999,
//   },
// ];

// ============================================================

export default function ShowLocationsEvent() {
  const [loading, setLoading] = useState(true);
  const [userState] = useContext(UserContext);
  const [myLocation, updateMylocation] = useState({
    lat: "",
    lng: "",
    formatted_address: "Your Location",
  });

  const [eventsLocations, updateEventsLocations] = useState([]);

  useEffect(() => {
    if (userState.id) {
      (async () => {
        try {
          const response = await fetch(`${server}/events`);
          const data = await response.json();
          const myEventsLocations = [];
          for (let event of data) {
            const location = {};
            location.formatted_address = event.location.formatted_address;
            location.lat = event.location.lat;
            location.lng = event.location.lng;
            location.name = event.location.name;
            location.event_id = event._id;
            myEventsLocations.push(location);
          }
          updateEventsLocations([...myEventsLocations]);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userState.id]);

  useEffect(() => {
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

  useEffect(() => {
    console.log(eventsLocations);
  });

  return (
    <div>
      <Geolocate />
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
