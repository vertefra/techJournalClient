import React from "react";
import "./cardEvents.css";
import { Link } from 'react-router-dom';
import { formatDate, entryFormat } from "../../utils";

function CardEvent(props) {
    const event = props.event
    const formattedDate = formatDate(event.date, entryFormat);

    return (
        <div className="CardEventContainer">
            <div className="CardItem">
                <div className="CardEventInfo">
                    <h2 className="CardTitle">{event.title}</h2>
                    <h4 className="CardTopic">Topic: {event.skill}</h4>
                    <h4 className="CardDate">Date and Time: {formattedDate}</h4>
                    <h4 className="CardLocation">Location: {event.location}</h4>
                </div>
                <div className='CardEventLink'>
                    <Link style={{ textDecoration: 'none' }} from={"*"} to={`/events/${event._id}`}>
                        <div className="btn-LearnMore" key={event._id}>Learn More</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default CardEvent;