import React, { useState, useEffect, useContext } from "react";
import "./LocationSearch.css";
import axios from "axios";
import { server } from "../../setting";
import GeoLocate from "./GeoLocate";
import { UserContext } from "../../context/ContextStore";

export default function LocationSearch() {
  const [userState] = useContext(UserContext);
  const [locations, updateLocations] = useState([]);
  const [query, setQuery] = useState("");

  // ======= GEOLOCATION ========= //

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(userState.location);
  };
  const handleSubmit = async () => {
    try {
      const response = axios.get(`${server}/locations?input=${query}`);
      const data = await response;
      updateLocations([...data.data.candidates]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(userState.location);
  }, []);
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
