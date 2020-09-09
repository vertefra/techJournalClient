import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/ContextStore';
import Layout from '../layout/Layout';
import axios from 'axios';
import { server } from '../../setting';
import UserCardEvent from './userCardEvent/UserCardEvent';
import CreateEvent from './createEvent/CreateEvent';

function UserEvents(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    const [eventsLoaded, updateEventsLoaded] = useState({
        loaded: false,
        createdEvents: []
    });

    useEffect(() => {
        {
            if (userState.loggedIn && eventsLoaded.loaded === false) {
                (async () => {
                    try {
                        const response = await axios.get(`${server}/users/${userState.id}/events?events=createdEvents`);
                        // console.log(response);
                        dispatchUserState({ type: "LOAD_EVENTS", payload: response.data });
                        updateEventsLoaded({ loaded: true });
                    } catch (error) {
                        console.log(error);
                    }
                })();
            }
        }
    }, [userState.loggedIn, eventsLoaded]);

    return (
        <Layout>
            <div className="AllEventsContainer">
                <CreateEvent />
                <h2>All User Events</h2>
                {userState.createdEvents.length > 0 && userState.createdEvents.map((event) => {
                    return (
                        <UserCardEvent key={event._id} event={event} controllers={[eventsLoaded, updateEventsLoaded]} />
                    );
                })}
            </div>
        </Layout>
    );
}

export default UserEvents;