import React from "react";

function UserCardEvent(props) {
    const event = props.event;
    console.log(event)
    return (
        <div>
            <h2>{event.title}</h2>
            <h4>Topic: {event.skill}</h4>
            <h4>Date and Time: {event.date}</h4>
            <h4>Location: {event.location}</h4>
        </div>
    );
}

export default UserCardEvent;