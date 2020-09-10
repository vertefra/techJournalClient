import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import "./showEvent.css";
import { server } from '../../../setting';
import WillAttend from '../willAttend/WillAttend';
import { eventFormatDate, eventFormat } from "../../utils";


function ShowEvent(props) {
    // const [userState, dispatchUserState] = useContext(UserContext);
    const [event, updateEvent] = useState({});
    const dateFormat = eventFormatDate(event.date, eventFormat);


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
                {Object.keys(event).length > 0 ? (
                    <div className="ShowEventContainer">
                        <Link className="LinkToAllEvents" to={'/events'}>Back to All Events</Link>
                        <div className="CardMainItem">
                            <div className="CardItemTitle">
                                <h1>{event.title}</h1>
                            </div>
                            <div className="CardItemEvent">
                                <h2 className="lable">About the Event</h2>
                                <h3>Topic: {event.skill}</h3>
                                <h3>Description: {event.description}</h3>
                            </div>
                            <div className="CardItemEvent">
                                <h2 className="lable">Event Details</h2>
                                <h3>Date and Time: {dateFormat}</h3>
                                <h3>Location: {event.location.formatted_address}</h3>
                            </div>
                            <div className="CardItemEvent">
                                <h2 className="lable">Speaker Info:</h2>
                                <h3>Name: {event.speaker.name}</h3>
                                <h3>Title: {event.speaker.title}</h3>
                            </div>
                            <div className="CardItemEventHost">
                                <h2 className="lable">Host Contact Info</h2>
                                <h3>Name: {event.host.name}</h3>
                                <h3>Title: {event.host.title}</h3>
                                <h3>Email: {event.host.email}</h3>
                                <h3>Phone Number: {event.host.phoneNumber}</h3>
                            </div>
                            <WillAttend event={event} />
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