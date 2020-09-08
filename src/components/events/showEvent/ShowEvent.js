import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";


function ShowEvent(props) {
    // const [userState, dispatchUserState] = useContext(UserContext);
    const [event, updateEvent] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const id = props.match.params.id
                const response = await axios.get(`https://techjournalserver.herokuapp.com/events/${id}`)
                console.log(response);
                updateEvent({ ...response.data });
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    console.log(event.speaker)
    return (
        <Layout>
            <div>
                <Link to={'/events'}>Back to All Events</Link>
                {Object.keys(event).length > 0 ? (
                    <div>
                        <h1>Show Page</h1>
                        <div>
                            <h2>{event.title}</h2>
                        </div>
                        <div>
                            <h3>About the Event</h3>
                            {/* <h4>Topic: {event.skill[0]}</h4> */}
                            <h4>Description: {event.description}</h4>
                            <h4>Speaker Info:</h4>
                            {/* <h4>Name: {event.speaker.name}</h4>
                            <h4>Title:{event.speaker.title}</h4> */}
                        </div>
                        <div>
                            <h3>Event Details</h3>
                            <h4>Date and Time: {event.date}</h4>
                            <h4>Location: {event.location}</h4>
                        </div>
                        <div>
                            <h3>Host Contact Info</h3>
                            <h4>Name: {event.host.name}</h4>
                            <h4>Title: {event.host.title}</h4>
                            <h4>Email: {event.host.email}</h4>
                            <h4>Phone Number: {event.host.phoneNumber}</h4>
                        </div>
                    </div>
                ) : (
                        <h1>Nothing found</h1>
                    )}
            </div>
        </Layout>
    )

}





export default ShowEvent;