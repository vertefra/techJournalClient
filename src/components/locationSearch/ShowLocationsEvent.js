import React, { useState, useContext, useEffect } from "react";
import Geolocate from "./component/GeoLocate";
import Map from "./component/Map";
import { UserContext } from "../../context/ContextStore";

export default function ShowLocationsEvent() {
  const [loading, setLoading] = useState(true);
  const [userState] = useContext(UserContext);
  const [location, updateLocation] = useState({
    lat: "",
    lng: "",
    address: "Your Location",
  });

  useEffect(() => {
    if (!userState.location.lat && !userState.location.lon) {
      console.log("location not set");
    } else {
      console.log("location set ", userState.location);
      //updating location
      updateLocation({
        ...location,
        lat: userState.location.lat,
        lng: userState.location.lon,
      });
      setLoading(false);
    }
  }, [userState.location.lat, userState.location.lon]);

  return (
    <div>
      <Geolocate />
      <h1>geolocate</h1>
      {loading === false ? (
        <Map location={location} zoomLevel={11} />
      ) : (
        "loading..."
      )}
    </div>
  );
}
