import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from '../layout/Layout';
import './dashboard.css'
import axios from 'axios'

function Dashboard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);

  return (
    <Layout>
      <div className="dashboardBody">
        <div className='dbUserInfo'>
          <h1>{userState.name}</h1>
        </div>
        <div className='dbEntries'>
          <h1>Notes</h1>
        </div>
        <div className='dbEvents'>
          <h1>Events</h1>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
