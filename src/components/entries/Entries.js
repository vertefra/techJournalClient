import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/ContextStore';
import axios from 'axios';
import Layout from '../layout/Layout';
const server = "https://techjournalserver.herokuapp.com";

function Entries(props) {
    const [userState, dispatchUserState] = useContext(UserContext);

    useEffect(() => {
        if (localStorage.token && userState.id !== '' && userState.loggedIn === true) {
            (async () => {
                try {
                    console.log(userState);
                    const response = await axios.get(`${server}/users/${userState.id}?populate=journalEntries`);
                    console.log(response);
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [userState])

    return (
        <div>
            <Layout>
                <div>
                    {userState.journalEntries.map((entry) => {
                        return (
                            <div>
                                <h1>{entry.title}</h1>
                                <h1>{entry.content}</h1>
                            </div>
                        )
                    })}
                </div>
            </Layout>
        </div>
    );
}

export default Entries;