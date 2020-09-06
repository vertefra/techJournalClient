import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextStore";
import axios from 'axios';
import './login.css';

function Login() {
    const [userState, dispatchUserState] = useContext(UserContext);
    const [loginInfo, updateLoginInfo] = useState({
        email: '',
        password: ''
    })
    const handleLoginChange = (event) => {
        updateLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
    }
    const handleLogin = async event => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/users/login', {
                email: loginInfo.email,
                password: loginInfo.password
            });
            localStorage.token = response.data.token;
            dispatchUserState({ type: "SET_NAME", payload: response.user.name });
            dispatchUserState({ type: "SET_EMAIL", payload: response.user.email });
            dispatchUserState({ type: "LOAD_ENTRIES", payload: response.user.entries });
            console.log(response, userState);
        } catch (error) {
            console.log(error);
        }
    }
    const [signupInfo, updateSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleSignupChange = (event) => {
        updateSignupInfo({ ...signupInfo, [event.target.name]: event.target.value })
    }
    const handleSignup = async event => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/users/signup", {
                name: signupInfo.name,
                email: signupInfo.email,
                password: signupInfo.password,
            });
            localStorage.token = response.data.token;
            dispatchUserState({ type: "SET_NAME", payload: response.user.name });
            dispatchUserState({ type: "SET_EMAIL", payload: response.user.email });
            console.log(response, userState);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className='header'>
                <h1 className='headerTitle'>App Title</h1>
            </div>
            <div className='pageContent'>
                <div className='pageItem loginContainer'>
                    <h2 className='title'>Login</h2>
                    <form onSubmit={handleLogin}>
                        <label htmlFor='loginEmail'>Email</label><br />
                        <input type='text' name='email' id='loginEmail' value={loginInfo.email} onChange={handleLoginChange} /><br />
                        <label htmlFor='loginPassword'>Password</label><br />
                        <input type='password' name='password' id='loginPassword' value={loginInfo.password} onChange={handleLoginChange} /><br />
                        <input type='submit' />
                    </form>
                </div>
                <div className='pageItem or'>
                    <h2 className='title'>Or</h2>
                </div>
                <div className='pageItem signupContainer'>
                    <h2 className='title'>Sign Up</h2>
                    <form onSubmit={handleSignup}>
                        <label htmlFor='signupName'>Name</label><br />
                        <input type='text' name='name' id='signupName' value={signupInfo.name} onChange={handleSignupChange} /><br />
                        <label htmlFor='signupEmail'>Email</label><br />
                        <input type='text' name='email' id='signupEmail' value={signupInfo.email} onChange={handleSignupChange} /><br />
                        <label htmlFor='signupPassword'>Password</label><br />
                        <input type='password' name='password' id='signupPassword' value={signupInfo.password} onChange={handleSignupChange} /><br />
                        <input type='submit' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;