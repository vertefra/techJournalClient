import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextStore";
import axios from "axios";
import Layout from "../layout/Layout"
import "./login.css";
import { server } from '../../setting';

function Login(props) {
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
            const response = await axios.post(`${server}/users/login`, {
                email: loginInfo.email,
                password: loginInfo.password
            });
            localStorage.token = response.data.token;
            console.log(response, userState);
            props.history.push('/dashboard')
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
            const response = await axios.post(`${server}/users/signup`, {
                name: signupInfo.name,
                email: signupInfo.email,
                password: signupInfo.password,
            });
            localStorage.token = response.data.token;
            console.log(response, userState);
            props.history.push('/dashboard')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='loginBody'>
            <Layout>
                <div className='pageContent'>
                    <div className='pageItem loginContainer'>
                        <h2 className='title'>Login</h2>
                        <form className='loginForm' onSubmit={handleLogin}>
                            <div>
                                <label htmlFor='loginEmail'>Email</label><br />
                                <input type='text' name='email' id='loginEmail' value={loginInfo.email} onChange={handleLoginChange} /><br />
                            </div>
                            <div>
                                <label htmlFor='loginPassword'>Password</label><br />
                                <input type='password' name='password' id='loginPassword' value={loginInfo.password} onChange={handleLoginChange} /><br />
                            </div>
                            <input type='submit' />
                        </form>
                    </div>
                    <div className='or'>
                        <h2 className='orTitle title'>Or</h2>
                    </div>
                    <div className='pageItem signupContainer'>
                        <h2 className='title'>Sign Up</h2>
                        <form className='loginForm' onSubmit={handleSignup}>
                            <div>
                                <label htmlFor='signupName'>Name</label><br />
                                <input type='text' name='name' id='signupName' value={signupInfo.name} onChange={handleSignupChange} /><br />
                            </div>
                            <div>
                                <label htmlFor='signupEmail'>Email</label><br />
                                <input type='text' name='email' id='signupEmail' value={signupInfo.email} onChange={handleSignupChange} /><br />
                            </div>
                            <div>
                                <label htmlFor='signupPassword'>Password</label><br />
                                <input type='password' name='password' id='signupPassword' value={signupInfo.password} onChange={handleSignupChange} /><br />
                            </div>
                            <input type='submit' />
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Login;