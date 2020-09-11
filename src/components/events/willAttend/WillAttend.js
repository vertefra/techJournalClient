import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../../setting";
import { UserContext } from "../../../context/ContextStore";

function WillAttend(props) {
  const [userState] = useContext(UserContext);
  const [event] = useState({ ...props.event });
  const [isAttended, setIsAttended] = useState("");
  const [eventsWillAttend, updateEventsWillAttend] = useState([]);

  const handleEventsWillAttend = (event) => {
    {
      if (userState.loggedIn && isAttended === false) {
        (async () => {
          try {
            const response = await axios.post(
              `${server}/users/${userState.id}/events/${event.target.id}`
            );
            console.log(response);
            // updateEventsWillAttend({ ...eventsWillAttend });
          } catch (error) {
            console.log(error);
          }
        })();
      } else {
        console.log("please log in");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${server}/users/${userState.id}/events?events=eventsWillAttend`
        );
        updateEventsWillAttend([...response.data]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const thisEvent = eventsWillAttend.find((evt) => {
      return evt._id.toString() === event._id;
    });
    if (thisEvent) {
      setIsAttended(true);
    }
    console.log(thisEvent);
  }, [eventsWillAttend]);

  return (
    <div>
      <button
        className="btn-WillAttend"
        id={event._id}
        onClick={handleEventsWillAttend}
      >
        {isAttended ? "Attending" : "Attend Event"}
      </button>
    </div>
  );
}

export default WillAttend;
