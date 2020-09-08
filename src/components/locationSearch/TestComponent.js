import React, { useState, useEffect } from "react";
import LocationSearch from "./LocationSearch";

export default function TestComponent(props) {
  const [locationsFounded, setLocationsFounded] = useState([]);
  useEffect(() => {
    console.log(locationsFounded);
  }, [locationsFounded]);
  return (
    <div>
      <LocationSearch
        radius={13000}
        controller={[locationsFounded, setLocationsFounded]}
      />
    </div>
  );
}
