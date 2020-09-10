import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from "../layout/Layout";
import axios from "axios";
import CardEvent from "./cardEvent/CardEvent.js";
import "./events.css";
import { server } from '../../setting';

function Events(props) {
    const [userState, dispatchUserState] = useContext(UserContext);

    // Index Page - All Events
    const [allEvents, updateAllEvents] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${server}/events`);
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
            <div className="AllPublicEventsContainer">
                <h1 className="h1-AllEvents">All Public Events</h1>
                <p className="p-AllEvents">Here you'll be able to explore all events created by our users and click on "Learn More" form more info about each event. From there, you'll be able to click on "Will Attend" to add that event to your events you'll attend.</p>
                {allEvents.length > 0 && allEvents.map(event => {
                    return (
                        <div>
                            <CardEvent event={event} />
                        </div>
                    );
                })}
            </div>
        </Layout>
    );

}

export default Events;