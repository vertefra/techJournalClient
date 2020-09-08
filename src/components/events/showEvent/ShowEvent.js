import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import "./showEvent.css";
import { server } from '../../../setting';

function ShowEvent(props) {
    // const [userState, dispatchUserState] = useContext(UserContext);
    const [event, updateEvent] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const id = props.match.params.id
                const response = await axios.get(`${server}/events/${id}`)
                console.log(response);
                updateEvent({ ...response.data });
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    console.log(event.speaker)
    console.log(event.host)
    return (
        <Layout>
            <div className="ShowPageContainer">
                <Link to={'/events'}>Back to All Events</Link>
                {Object.keys(event).length > 0 ? (
                    <div className="ShowEventContainer">
                        <div className="CardMainItem">
                            <div className="CardItemTitle">
                                <h2>{event.title}</h2>
                            </div>
                            <div className="CardItemAbout">
                                <h3>About the Event</h3>
                                <h4>Topic: {event.skill}</h4>
                                <h4>Description: {event.description}</h4>
                                <h4>Speaker Info:</h4>
                                <h4>Name: {event.speaker.name}</h4>
                                <h4>Title: {event.speaker.title}</h4>
                            </div>
                            <div className="CardItemDetails">
                                <h3>Event Details</h3>
                                <h4>Date and Time: {event.date}</h4>
                                <h4>Location: {event.location}</h4>
                            </div>
                            <div className="CardItemContact">
                                <h3>Host Contact Info</h3>
                                <h4>Name: {event.host.name}</h4>
                                <h4>Title: {event.host.title}</h4>
                                <h4>Email: {event.host.email}</h4>
                                <h4>Phone Number: {event.host.phoneNumber}</h4>
                            </div>
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