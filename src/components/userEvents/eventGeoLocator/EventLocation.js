import React, { useState, useContext, useEffect } from "react";
import Gelocate from "../../locationSearch/component/GeoLocate";
import { UserContext } from "../../../context/ContextStore";
import axios from "axios";
import { server } from "../../../setting";
import "./eventGeoLocator.css";

export default function EventLocation(props) {
  const [userState] = useContext(UserContext);
  const [location, updateLocation] = props.controller;
  const [query, setQuery] = useState("");
  const [options, updateOptions] = useState({
    candidates: [
      {
        name: "test",
        formatted_address: "test34343",
        name: "location name",
        geometry: {
          location: {
            lat: 40,
            lng: -70,
          },
        },
      },
    ],
    showOptions: false,
  });

  const handleChange = (e) => {
    console.log("setting query here ", e.target.value);
    setQuery(e.target.value);
  };

  const handleSelectLocation = (e, index) => {
    console.log(index);
    const candidate = options.candidates[index];
    setQuery(candidate.name);
    updateOptions({
      ...options,
      showOptions: false,
    });
    updateLocation({
      formatted_address: candidate.formatted_address,
      name: candidate.name,
      lat: candidate.geometry.location.lat,
      lng: candidate.geometry.location.lng,
    });
  };

  const sendQueryToServer = async (input) => {
    const lat = userState.location.lat || 40;
    const lng = userState.location.lng || -70;
    const radius = 10000;
    const response = await axios.get(
      `${server}/locations?input=${input}&latitude=${lat}&longitude=${lng}&radius=${radius}`
    );
    const candidates = response.data.candidates;
    console.log(candidates);
    if (candidates) {
      updateOptions({
        ...options,
        candidates: [...candidates],
        showOptions: true,
      });
    }
  };

  useEffect(() => {
    if (!query) {
      updateOptions({
        ...options,
        showOptions: false,
      });
    } else {
      // for testing purposes uncomment this section
      // updateOptions({
      //   ...options,
      //   showOptions: true,
      // });
      //+++++++++++++++++++++++++++++++++++++++++++++++
    }
    // ======================================================================= //
    // this makes the actual request. make sure is uncommented in production   //
    sendQueryToServer(query);
    // ======================================================================= //
  }, [query]);
  return (
    <div>
      <Gelocate />
      <input className="FormInput" value={query} onChange={handleChange} />
      {options.showOptions ? (
        <ul>
          {options.candidates.map((candidate, idx) => {
            return (
              <li
                className="suggestions"
                key={idx}
                onClick={(e) => handleSelectLocation(e, idx)}
              >
                <h5>{candidate.name}</h5>
                <h6>{candidate.formatted_address}</h6>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
