import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from '../layout/Layout';
import './dashboard.css'
import axios from 'axios'
import { server } from '../../setting'
import ShowLocationsEvent from '../locationSearch/ShowLocationsEvent'
import { sortByDate } from '../utils'

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
  useEffect(() => {
    const newArray = sortByDate(entries)
    console.log(entries, newArray)
  }, [userState]);
  return (
    <Layout>
      <div className="dashboardBody">
        <div className='dbUserInfo'>
          <div className='dbUserCover'>
            <h1>{userState.name}</h1>
            <hr />
            <h2>{userState.email}</h2>
          </div>
        </div>
        <div className='dbEntries'>
          <h1 className='dbEntryItem dbHeader'>Recent Entries</h1>
          {entries.map((entry) => {
            return (
              <div key={entry._id}>
                <div className='dbEntryItem'>
                  <h2>{entry.title}</h2>
                  <hr />
                  <p>{entry.content}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className='dbEvents'>
          <h1 className='dbHeader'>Events</h1>
          <div>
            <ShowLocationsEvent />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
