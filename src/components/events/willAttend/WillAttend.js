import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../../setting';
import { UserContext } from '../../../context/ContextStore';


function WillAttend(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    const [event, updateEvent] = useState({ ...props.event });
    const [eventsWillAttend, updateEventsWillAttend] = useState({
        eventsWillAttend: []
    });

    const handleEventsWillAttend = (event) => {
        console.log(event.target.id)
        {
            if (userState.loggedIn) {
                (async () => {
                    try {
                        const response = await axios.post(`${server}/users/${userState.id}/events/${event.target.id}`)
                        console.log(response);
                        updateEventsWillAttend({ ...eventsWillAttend })
                    } catch (error) {
                        console.log(error);
                    }
                })();
            } else {
                console.log('please log in')
            }
        }
    };

    return (
        <div>
            <button id={event._id} onClick={handleEventsWillAttend}>Attend Event</button>
        </div>
    );
};

export default WillAttend;