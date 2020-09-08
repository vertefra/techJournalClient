import React from "react";
import "./cardEvents.css";

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
            </div>
        </div>
    );
}


export default CardEvent;