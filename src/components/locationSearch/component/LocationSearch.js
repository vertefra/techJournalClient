import React, { useState, useEffect, useContext } from "react";
import "./LocationSearch.css";
import axios from "axios";
import { server } from "../../setting";
import GeoLocate from "./GeoLocate";
import { UserContext } from "../../context/ContextStore";

export default function LocationSearch(props) {
  const [userState] = useContext(UserContext);
  const [query, setQuery] = useState("");

  const [locations, updateLocations] = props.controller;

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const latitude = userState.location.lat || 45;
      const longitude = userState.location.lon || -74;
      const radius = props.radius || 2000;
      const response = await axios.get(
        `${server}/locations?input=${query}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      );
      const data = await response;
      const candidate = data.data.candidates[0];
      const locObj = {
        address: candidate.formatted_address,
        lat: candidate.geometry.location.lat,
        lng: candidate.geometry.location.lng,
      };
      updateLocations({ ...locObj });
      console.log(locations);
      setQuery("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <GeoLocate />
      <input
        className="searchField"
        type="text"
        value={query}
        onChange={handleChange}
      ></input>
      <button onClick={handleSubmit}>search</button>
    </div>
  );
}
