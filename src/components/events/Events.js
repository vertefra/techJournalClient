import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from "../layout/Layout";
import axios from "axios";

function Events(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    // const [newEvent, updateNewEvent] = useState({
    //     title: '',
    //     date: '',
    //     time: '',
    //     description: '',
    //     location: '',
    //     topic: '',
    //     host: {},
    //     speaker: {},
    // });
    // const handleCreateEvent = () => {
    //     updateNewEvent({ ...newEvent, [event.target.id]: event.target.value });

    //     const handlleCreate = async event => {
    //         event.preventDefault();
    //         try {
    //             const response = await axios.post('http://localhost:3001/users/events', {

    //             })
    //         }
    // }

    // }

    return (
        <Layout>
            <div>
                <h1>All Events Created by a User</h1>
            </div>
        </Layout>
    );

}

export default Events;