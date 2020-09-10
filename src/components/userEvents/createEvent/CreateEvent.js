import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/ContextStore";
import axios from "axios";
import { server } from "../../../setting";
import "./createEvent.css";
import EventLocation from "../eventGeoLocator/EventLocation";
import Topics from "../topicsComponent/Topics";

function CreateEvent(props) {
  const [userState, dispatchUserState] = useContext(UserContext);

  const [event, updateEvent] = useState({
    title: "",
    date: "",
    description: "",
  });

  // this state is handled by EventLocation Component

  const [location, updateLocation] = useState({
    name: "",
    formatted_address: "",
    lat: 0,
    lng: 0,
  });
  // ================================================

  //  this state is handled by the Topics component

  const [topics, setTopics] = useState([]);

  // ================================================

  const [host, updateHost] = useState({
    name: "",
    title: "",
    email: "",
    phoneNumber: "",
  });

  const [speaker, updateSpeaker] = useState({
    name: "",
    title: "",
  });

  const handleChange = (e) => {
    updateEvent({ ...event, [e.target.id]: e.target.value });
  };

  // const handleChangeTopics = (event) => {
  //   updateTopics({ ...topics, skill: event.target.value });
  // };

  const handleChangeHost = (event) => {
    updateHost({ ...host, [event.target.name]: event.target.value });
  };

  const handleChangeSpeaker = (event) => {
    updateSpeaker({ ...speaker, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const body = {
          title: event.title,
          name: event.name,
          description: event.description,
          date: event.date,
          location: location,
          host: host,
          speaker: speaker,
        };
        console.log("sending body: ", body);
        const response = await axios.post(
          `${server}/users/${userState.id}/events`,
          body
        );
        console.log(response);
        // dispatchUserState({ type: "ADD_EVENT", payload: response.data });
        updateEvent({
          ...event,
          ...{ title: "", date: "", description: "", location: "" },
        });
        updateHost({
          ...host,
          ...{
            hostName: "",
            hostTitle: "",
            hostEmail: "",
            hostPhoneNumber: "",
          },
        });
        updateSpeaker({ ...speaker, ...{ speakerName: "", speakerTitle: "" } });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  // debug

  useEffect(() => {
    console.log("set location is: ", location);
    console.log("adding event_id");
  }, [location]);

  return (
    <div className="CreateEventContainer">
      <div className="CreateEventCard">
        <h1 className="MainFormHeadline">Create a New Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="FormEvent">
            <div className="HostInfo">
              <h3 className="Legend">Host Information</h3>
              <div>
                <label htmlFor="hostName">Host Name</label>
                <br />
                <input
                  className="FormInput"
                  type="text"
                  name="name"
                  id="hostName"
                  value={host.name}
                  onChange={handleChangeHost}
                />
                <br />
              </div>
              <div>
                <label htmlFor="hostTitle">Host Title</label>
                <br />
                <input
                  className="FormInput"
                  type="text"
                  name="title"
                  id="hostTitle"
                  value={host.title}
                  onChange={handleChangeHost}
                />
                <br />
              </div>
              <div>
                <label htmlFor="hostEmail">Host Email</label>
                <br />
                <input
                  className="FormInput"
                  type="email"
                  name="email"
                  id="hostEmail"
                  value={host.email}
                  placeholder="example@gmail.com"
                  onChange={handleChangeHost}
                />
                <br />
              </div>
              <div>
                <label htmlFor="hostPhoneNumber">Host Phone Number</label>
                <br />
                <input
                  className="FormInput"
                  type="number"
                  name="phoneNumber"
                  id="hostPhoneNumber"
                  value={host.phoneNumber}
                  onChange={handleChangeHost}
                />
                <br />
              </div>
            </div>
            <div className="AboutTheEvent">
              <h3 className="Legend">About The Event</h3>
              <div>
                <label htmlFor="title">Title</label>
                <br />
                <input
                  className="FormInput"
                  type="text"
                  name="title"
                  id="title"
                  value={event.title}
                  onChange={handleChange}
                />
                <br />
              </div>
              {/* this is where I insert the topics controller */}
              <Topics controller={[topics, setTopics]} />
              {/* <div>
                <label htmlFor="topics">Topic</label>
                <br />
                <input
                  className="FormInput"
                  type="text"
                  name="topics"
                  id="topics"
                  value={topics.skill}
                  onChange={handleChangeTopics}
                />
               <br />
              </div> */}

              <div>
                <label htmlFor="description">Description</label>
                <br />
                <input
                  className="FormInput"
                  type="text"
                  name="description"
                  id="description"
                  value={event.description}
                  onChange={handleChange}
                />
                <br />
              </div>
            </div>
            <div className="SpeakerInfo">
              <h3 className="Legend">Speaker Information</h3>
              <div className="SpeakerName">
                <div>
                  <label htmlFor="speakerName">Speaker Name</label>
                  <br />
                  <input
                    className="FormInput"
                    type="text"
                    name="name"
                    id="speakerName"
                    value={speaker.Name}
                    onChange={handleChangeSpeaker}
                  />
                  <br />
                </div>
                <div>
                  <label htmlFor="speakerTitle">Speaker Title</label>
                  <br />
                  <input
                    className="FormInput"
                    type="text"
                    name="title"
                    id="speakerTitle"
                    value={speaker.title}
                    onChange={handleChangeSpeaker}
                  />
                  <br />
                </div>
              </div>
            </div>
            <div className="EventDetails">
              <h3 className="Legend">Events Details</h3>
              <div>
                <label htmlFor="date">Date and Time</label>
                <input
                  className="FormInput"
                  type="datetime-local"
                  name="date"
                  id="date"
                  value={event.date}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                {/* this is where I should insert my special input */}
                {/* <label htmlFor="location">Location</label>
                <br />
                <input
                  className="FormInput"
                  type="text"
                  name="location"
                  id="location"
                  value={event.location}
                  onChange={handleChange}
                /> */}
                {/* and here where it end.  */}
                <EventLocation
                  id="location"
                  controller={[location, updateLocation]}
                />
                <br />
              </div>
            </div>
          </div>
          <input
            className="btn-CreateEvent"
            type="submit"
            value="Create a New Event"
          />
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
