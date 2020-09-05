import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/ContextStore";

function Dashboard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);

  // test to check if useContext works

  const entries = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    dispatchUserState({ type: "LOAD_ENTRIES", payload: entries });
  }, []);

  useEffect(() => {
    console.log(userState);
  });

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <h2>{userState.journalEntries}</h2>
    </div>
  );
}

export default Dashboard;
