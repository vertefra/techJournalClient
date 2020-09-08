import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/ContextStore';
import Layout from '../layout/Layout';
import axios from 'axios';
import { server } from '../../setting';
import UserCardEvent from './userCardEvent/UserCardEvent';

function UserEvents(props) {
    const [userState, dispatchUserState] = useContext(UserContext);

    useEffect(() => {
        {
            if (userState.loggedIn) {
                (async () => {
                    try {
                        const response = await axios.get(`${server}/users/${userState.id}/events?events=createdEvents`);
                        // console.log(response);
                        dispatchUserState({ type: "LOAD_EVENTS", payload: response.data });
                    } catch (error) {
                        console.log(error);
                    }
                })();
            }
        }
    }, [userState.loggedIn]);

    return (
        <Layout>
            <h1>All User Events</h1>
            {userState.createdEvents.length > 0 && userState.createdEvents.map((event) => {
                return (
                    <UserCardEvent key={event._id} event={event} />
                )
            })}
        </Layout>
    );
}

export default UserEvents;