import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/ContextStore";
import Layout from './layout/Layout';
import axios from 'axios'

function Dashboard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);

  return (
    <Layout>
      <div className="App">
        <h1>Dashboard</h1>
        <h2>{userState.name}</h2>
        <h2>{userState.email}</h2>
      </div>
    </Layout>
  );
}

export default Dashboard;
