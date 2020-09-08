import React from "react";
import "./cardEvents.css";
import { Link } from 'react-router-dom';


function CardEvent(props) {
    const event = props.event
    // console.log(event)
    // console.log(event.host.name)
    return (
        <div className="CardEventContainer">
            <div className="CardItem">
                <h2 className="CardTitle">{event.title}</h2>
                <h4 className="CardDate">Date and Time: {event.date}</h4>
                <h4 className="CardLocation">Location: {event.location}</h4>
                <h4 className="CardTopic">Topic: {event.skill}</h4>
                <Link from={"*"} to={`/events/${event._id}`}>
                    <div key={event._id}>Learn More</div>
                </Link>
            </div>
        </div>
    );
}


export default CardEvent;