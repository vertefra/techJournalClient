import React from "react";
import "./cardEvents.css";
import { Link } from 'react-router-dom';
// import ShowEvent from './showEvent/ShowEvent.js';

function CardEvent(props) {
    const event = props.event
    // console.log(event)
    return (
        <div className="CardEventContainer">
            <div className="CardItem">
                <h2 className="CardTitle">{event.title}</h2>
                <h4 className="CardDate">Date and Time: {event.date}</h4>
                <h4 className="CardLocation">Location: {event.location}</h4>
                {/* <h4>{event.topic}</h4> */}

                {/* <ShowEvent event={event} /> */}
                <Link to={`/${event._id}`}>
                    <div key={event._id}>Learn More</div>
                </Link>
            </div>
        </div>
    );
}


export default CardEvent;