import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/ContextStore';
import axios from 'axios';
import { server } from '../../../setting';
import './createEvent.css';

function CreateEvent(props) {
    const [userState, dispatchUserState] = useContext(UserContext);

    const [event, updateEvent] = useState({
        title: '',
        date: '',
        description: '',
        location: ''
    });

    const [topics, updateTopics] = useState({
        skill: ''
    });

    const [host, updateHost] = useState({
        hostName: '',
        hostTitle: '',
        hostEmail: '',
        hostPhoneNumber: ''
    });

    const [speaker, updateSpeaker] = useState({
        speakerName: '',
        speakerTitle: ''
    });

    const handleChange = (e) => {
        updateEvent({ ...event, [e.target.id]: e.target.value });
    };

    const handleChangeTopics = (event) => {
        console.log(event.target.value)
        updateTopics({ ...topics, skill: event.target.value });
        console.log(topics)
    }

    const handleChangeHost = (event) => {
        console.log(host)
        updateHost({ ...host, [event.target.id]: event.target.value });
    }

    const handleChangeSpeaker = (event) => {
        console.log(speaker)
        updateSpeaker({ ...speaker, [event.target.id]: event.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        (async () => {
            try {
                const body = { title: event.title, name: event.name, description: event.description, date: event.date, location: event.location, host: host, speaker: speaker }
                const response = await axios.post(`${server}/users/${userState.id}/events`, {
                    body,
                });
                console.log(response);
                // dispatchUserState({ type: "ADD_EVENT", payload: response.data });
                updateEvent({ ...event, ...{ title: '', date: '', description: '', location: '' } });
                updateTopics({ ...topics, ...{ skill: '' } });
                updateHost({ ...host, ...{ hostName: '', hostTitle: '', hostEmail: '', hostPhoneNumber: '' } });
                updateSpeaker({ ...speaker, ...{ speakerName: '', speakerTitle: '' } });
            } catch (error) {
                console.log(error);
            }
        })();
    };

    return (
        <div className="CreateEventContainer">
            <div className="CreateEventCard">
                <h1 className="MainFormHeadline">Create a New Event</h1>
                <form onSubmit={handleSubmit}>
                    <div className="FormEvent">
                        <div className="HostInfo">
                            <h3 className="Legend">Host Information</h3>
                            <div>
                                <label htmlFor='hostName'>Host Name</label><br />
                                <input
                                    className="FormInput"
                                    type='text'
                                    name='hostName'
                                    id='hostName'
                                    value={host.name}
                                    onChange={handleChangeHost}
                                /><br />
                            </div>
                            <div>
                                <label htmlFor='hostTitle'>Host Title</label><br />
                                <input
                                    className="FormInput"
                                    type='text'
                                    name='hostTitle'
                                    id='hostTitle'
                                    value={host.title}
                                    onChange={handleChangeHost}
                                /><br />
                            </div>
                            <div>
                                <label htmlFor='hostEmail'>Host Email</label><br />
                                <input
                                    className="FormInput"
                                    type='email'
                                    name='hostEmail'
                                    id='hostEmail'
                                    value={host.email}
                                    placeholder='example@gmail.com'
                                    onChange={handleChangeHost}
                                /><br />
                            </div>
                            <div>
                                <label htmlFor='hostPhoneNumber'>Host Phone Number</label><br />
                                <input
                                    className="FormInput"
                                    type='number'
                                    name='hostPhoneNumber'
                                    id='hostPhoneNumber'
                                    value={host.phoneNumber}
                                    onChange={handleChangeHost}
                                /><br />
                            </div>
                        </div>
                        <div className="AboutTheEvent">
                            <h3 className="Legend">About The Event</h3>
                            <div>
                                <label htmlFor='title'>Title</label><br />
                                <input
                                    className="FormInput"
                                    type='text'
                                    name='title'
                                    id='title'
                                    value={event.title}
                                    onChange={handleChange}
                                /><br />
                            </div>
                            <div>
                                <label htmlFor='topics'>Topic</label><br />
                                <input
                                    className="FormInput"
                                    type='text'
                                    name='topics'
                                    id='topics'
                                    value={topics.skill}
                                    onChange={handleChangeTopics}
                                /><br />
                            </div>
                            <div>
                                <label htmlFor='description'>Description</label><br />
                                <input
                                    className="FormInput"
                                    type='text'
                                    name='description'
                                    id='description'
                                    value={event.description}
                                    onChange={handleChange}
                                /><br />
                            </div>
                        </div>
                        <div className="SpeakerInfo">
                            <h3 className="Legend">Speaker Information</h3>
                            <div className="SpeakerName">
                                <div>
                                    <label htmlFor='speakerName'>Speaker Name</label><br />
                                    <input
                                        className="FormInput"
                                        type='text'
                                        name='speakerName'
                                        id='speakerName'
                                        value={speaker.Name}
                                        onChange={handleChangeSpeaker}
                                    /><br />
                                </div>
                                <div>
                                    <label htmlFor='speakerTitle'>Speaker Title</label><br />
                                    <input
                                        className="FormInput"
                                        type='text'
                                        name='speakerTitle'
                                        id='speakerTitle'
                                        value={speaker.title}
                                        onChange={handleChangeSpeaker}
                                    /><br />
                                </div>
                            </div>
                        </div>
                        <div className="EventDetails">
                            <h3 className="Legend">Events Details</h3>
                            <div>
                                <lable htmlFor='date'>Date and Time</lable>
                                <input
                                    className="FormInput"
                                    type='datetime-local'
                                    name='date'
                                    id='date'
                                    value={event.date}
                                    onChange={handleChange}
                                /><br />
                            </div>
                            <div>
                                <label htmlFor='location'>Location</label><br />
                                <input
                                    className="FormInput"
                                    type='text'
                                    name='location'
                                    id='location'
                                    value={event.location}
                                    onChange={handleChange}
                                /><br />
                            </div>
                        </div>
                    </div>
                    <input className="btn-CreateEvent" type="submit" value="Create a New Event" />
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;