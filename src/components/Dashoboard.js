import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/ContextStore";

function Dashboard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);

  // test to check if useContext works
  useEffect(() => {
    dispatchUserState({ type: "SET_NAME", payload: "marco" });
  }, [userState.name]);

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <h2>{userState.name}</h2>
    </div>
  );
}

export default Dashboard;
