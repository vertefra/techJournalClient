import React from "react";

function UserCardEvent(props) {
    const event = props.event;
    console.log(event)
    return (
        <div className="CardEventContainer">
            <div className="CardItem">
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
    );
}

export default UserCardEvent;