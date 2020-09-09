import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from '../layout/Layout';
import './dashboard.css'
import axios from 'axios'
import { server } from '../../setting'

function Dashboard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);
  const [entries, updateEntries] = useState([]);

  useEffect(() => {
    {
      if (userState.loggedIn) {
        (async () => {
          try {
            const response = await fetch(
              `${server}/users/${userState.id}/entries`
            );
            const data = await response.json();
            console.log(data);
            updateEntries([...entries, ...data.entries]);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [userState.loggedIn]);

  return (
    <div className="dashboardBody">
      <Layout>
        <div className='dbFlex'>
          <div className='dbUserInfo'>
            <h1>{userState.name}</h1>
            <hr />
            <h2>{userState.email}</h2>
          </div>
          <div className='dbEntries'>
            <h1>Recent Entries</h1>
            {entries.map((entry) => {
              return (
                <div key={entry._id}>
                  <hr />
                  <div className='dbEntryItem'>
                    <h2>{entry.title}</h2>
                    <p>{entry.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='dbEvents'>
            <h1>Events</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Dashboard;
