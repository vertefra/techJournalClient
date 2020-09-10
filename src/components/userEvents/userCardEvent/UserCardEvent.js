import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/ContextStore";
import axios from "axios";
import { server } from "../../../setting";
import "./userCardEvent.css";
import { eventFormatDate, eventFormat } from "../../utils";


function UserCardEvent(props) {
  // const event = props.event;
  const [userState, dispatchUserState] = useContext(UserContext);
  const [event, updateEvent] = useState({ ...props.event });
  const [events, updateEvents] = props.controllers;
  const dateFormat = eventFormatDate(event.date, eventFormat);

  const handleDelete = (event) => {
    (async () => {
      try {
        const response = await axios.delete(
          `${server}/events/${event.target.id}?user_id=${userState.id}`
        );
        console.log(response);
        updateEvents({ ...events, loaded: false });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      {event ? (
        <div className="UserCardEventContainer">
          <div className="UserCardItem">
            <div className="UserCardItemAbout">
              <h3>About the Event</h3>
              <h4>Topic: {event.skill}</h4>
              <h4>Description: {event.description}</h4>
              <h4>Speaker Info:</h4>
              <h4>Name: {event.speaker.name}</h4>
              <h4>Title: {event.speaker.title}</h4>
            </div>
            <div className="UserCardItemDetails">
              <h3>Event Details</h3>
              <h4>Date and Time: {dateFormat}</h4>
              <h4>Location: {event.location.formatted_address}</h4>
            </div>
            <div className="UserCardItemContact">
              <h3>Host Contact Info</h3>
              <h4>Name: {event.host.name}</h4>
              <h4>Title: {event.host.title}</h4>
              <h4>Email: {event.host.email}</h4>
              <h4>Phone Number: {event.host.phoneNumber}</h4>
            </div>
            <button id={event._id} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
          "loading events..."
        )}
    </>
  );
}

export default UserCardEvent;
