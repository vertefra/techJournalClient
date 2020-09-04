import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./components/Dashoboard";
import { BrowserRouter, Route } from "react-router-dom";
import userState from "../stores/userState.js";

// every route will be added to the routes array

const routes = [
  {
    path: "/",
    component: Dashboard,
    key: "dashboard",
  },
];

// Here is where we create all the context for the states that we want

const UserContext = React.createContext(userState);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {routes.map((route) => {
        return (
          <Route
            component={route.component}
            path={route.path}
            key={route.key}
          />
        );
      })}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
