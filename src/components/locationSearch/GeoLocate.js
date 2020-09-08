import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";

export default function GeoLocate() {
  const [userState, dispatchUserstate] = useContext(UserContext);

  useEffect(() => {
    console.log(userState.location);
    const current_location = navigator.geolocation;
    current_location.getCurrentPosition((pos) => {
      console.log(pos.coords.latitude);
      dispatchUserstate({
        type: "SET_LOCATION",
        payload: { lat: pos.coords.latitude, lon: pos.coords.longitude },
      });
    });
  }, []);

  useEffect(() => {
    console.log(userState.location);
  });
  return <div></div>;
}
