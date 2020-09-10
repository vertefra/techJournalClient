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
    console.log("setting query here ", e.target.value);
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    setQuery(e.target.value);
  };

  const sendQuery = async (input) => {
    try {
      const latitude = userState.location.lat || 45;
      const longitude = userState.location.lon || -74;
      const radius = props.radius || 2000;
      const response = await axios.get(
        `${server}/locations?input=${input}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
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

  // this useEffect will run every time that the user insert something inside the input and will run sendQuery  function

  useEffect(() => {
    console.log(
      "I should read the query change and invoke the function with param: ",
      query
    );
    sendQuery(query);
  }, [query]);
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
