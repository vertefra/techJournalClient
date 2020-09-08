import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from "../layout/Layout";
import axios from "axios";
import CardEvent from "./cardEvent/CardEvent.js";
import "./events.css";

function Events(props) {
    const [userState, dispatchUserState] = useContext(UserContext);

    // Index Page - All Events
    const [allEvents, updateAllEvents] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('https://techjournalserver.herokuapp.com/events');
                console.log(response)
                updateAllEvents([...response.data]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        console.log(allEvents)
    }, [allEvents]);

    return (
        <Layout>
            <div className="AllEventsContainer">
                <h1>All Events</h1>
                {allEvents.length > 0 && allEvents.map(event => {
                    return (
                        <CardEvent event={event} />
                    );
                })}
            </div>
        </Layout>
    );

}

export default Events;