import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom"
import { UserContext } from "../../context/ContextStore";
import axios from 'axios';
import './layout.css';
const server = "https://techjournalserver.herokuapp.com";

function Layout(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    const handleLogout = () => {
        localStorage.clear();
        props.history.push('/login')
    }
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    useEffect(() => {
        const userIdentification = parseJwt(localStorage.token)
        console.log(userIdentification);
        (async () => {
            try {
                const response = await axios.get(`${server}/users/${userIdentification.id}`);
                console.log(response);
                dispatchUserState({ type: "SET_ID", payload: response.data._id });
                dispatchUserState({ type: "SET_NAME", payload: response.data.name });
                dispatchUserState({ type: "SET_EMAIL", payload: response.data.email });
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div>
            <div className='header'>
                <h1 className='headerTitle'>App Title</h1>
                <div>
                    <a href='/dashboard'>Dashboard</a>
                    <a href='/entries'>Entries</a>
                    <a href='/canvas'>Canvas</a>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default withRouter(Layout);