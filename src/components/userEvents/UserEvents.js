import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from "../layout/Layout";
import axios from "axios";
import { server } from "../../setting";
import UserCardEvent from "./userCardEvent/UserCardEvent";
import CreateEvent from "./createEvent/CreateEvent";
import "./createEvent/createEvent.css";

function UserEvents(props) {
  const [userState, dispatchUserState] = useContext(UserContext);
  const [events, updateEvents] = useState({
    loaded: false,
    eventsArr: [],
  });

  useEffect(() => {
    {
      if (userState.loggedIn && events.loaded === false) {
        (async () => {
          try {
            const response = await axios.get(
              `${server}/users/${userState.id}/events?events=createdEvents`
            );
            console.log(response);
            updateEvents({
              ...events,
              eventsArr: [...response.data],
              loaded: true,
            });
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [userState.loggedIn, events]);

  return (
    <Layout>
      <div className="AllEventsContainer">
        <CreateEvent />
        <h2 className="h1-UserEvents">
          All Created Events by {userState.name.toUpperCase()}
        </h2>
        {events.eventsArr.length > 0 &&
          events.eventsArr.map((event) => {
            return (
              <UserCardEvent
                key={event._id}
                event={event}
                controllers={[events, updateEvents]}
              />
            );
          })}
      </div>
    </Layout>
  );
}

export default UserEvents;
