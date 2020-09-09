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
        location: '',
    });

    const [topics, updateTopics] = useState({
        skill: ''
    });

    const [host, updateHost] = useState({
        name: '',
        title: '',
        email: '',
        phoneNumber: ''
    });

    const [speaker, updateSpeaker] = useState({
        name: '',
        title: ''
    });

    const handleChange = (event) => {
        updateEvent({ ...event, [event.target.id]: event.target.value });
        updateTopics({ ...topics, [event.target.id]: event.target.value });
        updateHost({ ...host, [event.target.id]: event.target.value });
        updateSpeaker({ ...speaker, [event.target.id]: event.target.value });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        (async () => {
            try {
                const response = await axios.post(`${server}/users/${userState.id}/events`, {
                    ...event,
                });
                console.log(response);
                // dispatchUserState({ type: "ADD_EVENT", payload: response.data });
                updateEvent({ ...event, ...{ title: '', date: '', description: '', location: '' } });
                updateTopics({ ...topics, ...{ skill: '' } });
                updateHost({ ...host, ...{ name: '', title: '', email: '', phoneNumber: '' } });
                updateSpeaker({ ...speaker, ...{ name: '', title: '' } });
            } catch (error) {
                console.log(error);
            }
        })();
    };

    return (
        <div className="CardEventContainer">
            <div className="CardItem">
                <h1>Create a New Event</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='title'>Title</label><br />
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={event.title}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <lable htmlFor='date'>Date and Time</lable>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={event.date}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label><br />
                        <input
                            type='text'
                            name='description'
                            id='description'
                            value={event.description}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='location'>Location</label><br />
                        <input
                            type='text'
                            name='location'
                            id='location'
                            value={event.location}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='topics'>Topics</label><br />
                        <input
                            type='text'
                            name='topics'
                            id='topics'
                            value={topics.skill}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='hostName'>Host Name</label><br />
                        <input
                            type='text'
                            name='hostName'
                            id='hostName'
                            value={host.name}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='hostTitle'>Host Title</label><br />
                        <input
                            type='text'
                            name='hostTitle'
                            id='hostTitle'
                            value={host.title}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='hostEmail'>Host Email</label><br />
                        <input
                            type='text'
                            name='hostEmail'
                            id='hostEmail'
                            value={host.email}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='hostPhoneNumber'>Host Phone Number</label><br />
                        <input
                            type='text'
                            name='hostPhoneNumber'
                            id='hostPhoneNumber'
                            value={host.phoneNumber}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='speakerName'>Speaker Name</label><br />
                        <input
                            type='text'
                            name='speakerName'
                            id='speakerName'
                            value={speaker.Name}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <div>
                        <label htmlFor='speakerTitle'>Speaker Title</label><br />
                        <input
                            type='text'
                            name='speakerTitle'
                            id='speakerTitle'
                            value={speaker.title}
                            onChange={handleChange}
                        /><br />
                    </div>
                    <input type="submit" value="Create a New Event" />
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;