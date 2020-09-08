import React, { useReducer } from "react";
import UserReducer from "../reducer/UserReducer";

// ====== userContext ======================== //
//
// this is the default state that will be
// used to compare the state distributed
// to all the components with context Provider

const defaultUserState = {
  id: "",
  name: "",
  email: "",
  journalEntries: [],
  createdEvents: [],
  eventsWillAttend: [],
  myCanvasProject: [],
  loggedIn: false,
};

// ====== ContextStore ======================= //
//
// This componente will wrap all the other
// components providing the state to the whole
// application. You can update the state using
// dispatchUserState().
//
// As you can see in UserReducer.js,
// dispatchUserState() requires an object with
// a .type and .payload. Type is the type of
// action that you want to perform (indicated)
// in the reducer switch cases, and payload
// is the content the new content.

export default function ContextStore({ children }) {
  const [userState, dispatchUserState] = useReducer(
    UserReducer,
    defaultUserState
  );
  return (
    <UserContext.Provider value={[userState, dispatchUserState]}>
      {children}
    </UserContext.Provider>
  );
}

// UserContext will be used by useContext() to check state changes

export const UserContext = React.createContext(defaultUserState);
