import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom"
import { UserContext } from "../../context/ContextStore";
import axios from 'axios';
import './layout.css';
import { server } from "../../setting";

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
        if (!localStorage.token) {
            return
        }
        const userIdentification = parseJwt(localStorage.token);
        (async () => {
            try {
                const response = await axios.get(`${server}/users/${userIdentification.id}`);
                dispatchUserState({ type: "SET_ID", payload: response.data._id });
                dispatchUserState({ type: "SET_NAME", payload: response.data.name });
                dispatchUserState({ type: "SET_EMAIL", payload: response.data.email });
                dispatchUserState({ type: "SET_LOGGEDIN", payload: true });
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div>
            <div className='header'>
                <h1 className='headerTitle'>App Title</h1>
                <div className='navBar'>
                    <div className='navItem'>
                        <a className='itemText' href='/dashboard'>Dashboard</a>
                    </div>
                    <div className='navItem'>
                        <a className='itemText' href='/entries'>Entries</a>
                    </div>
                    <div className='navItem'>
                        <a className='itemText' href='/events'>Events</a>
                    </div>
                    <div className='navItem'>
                        <a className='itemText' href='/canvas'>Canvas</a>
                    </div>
                    <div className='navItem'>
                        <a className='itemText' href='/events'>All Events</a>
                    </div>
                    <div className='navItem'>
                        <button className='itemText' onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default withRouter(Layout);