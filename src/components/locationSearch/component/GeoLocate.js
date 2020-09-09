import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../context/ContextStore";

// GeoLocate module
//
// place the geolocate module in your module and
// it will set the location property of the user
// state to the current location, with latitutude
// and longitude.

export default function GeoLocate() {
  const [userState, dispatchUserstate] = useContext(UserContext);

  useEffect(() => {
    const current_location = navigator.geolocation;
    current_location.getCurrentPosition((pos) => {
      dispatchUserstate({
        type: "SET_LOCATION",
        payload: { lat: pos.coords.latitude, lon: pos.coords.longitude },
      });
    });
  }, []);
  return <div></div>;
}
