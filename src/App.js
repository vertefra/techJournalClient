import React from "react";
import Dashboard from "./components/Dashoboard";
import LoginPage from "./components/login/LoginPage";
import Canvas from "./components/canvas/Canvas";
import Entries from "./components/entries/Entries";
import { BrowserRouter, Route } from "react-router-dom";
import ContextStore from "./context/ContextStore";
import Events from "./components/events/Events";
import ShowEvent from "./components/events/showEvent/ShowEvent";
import "./components/animations.css";
import UserEvents from "./components/userEvents/UserEvents";

export default function App() {
  // ROUTES ================================== //

  const routes = [
    {
      path: "/dashboard",
      component: Dashboard,
      key: "dashboard",
    },
    {
      path: "/login",
      component: LoginPage,
      key: "login",
    },
    {
      path: "/canvas",
      component: Canvas,
      key: "canvas",
    },
    {
      path: "/entries",
      component: Entries,
      key: "entries",
    },
    {
      exact: true,
      path: "/events",
      component: Events,
      key: "events",
    },
    {
      path: "/events/:id",
      component: ShowEvent,

      key: "showEvent",
    },
    {
      path: "/myevents",
      component: UserEvents,
      key: "myevents",
    },
  ];

  // ========================================= //

  // User Context is provided by <ContextStore>
  // You can add more global states adding
  // hooks and state object to ContextStore.
  // The state is globally distributed through
  // Context.Provider

  // ========================================= //

  return (
    <ContextStore>
      <BrowserRouter>
        {routes.map((route) => {
          return (
            <Route
              component={route.component}
              path={route.path}
              key={route.key}
              exact={route.exact}
            />
          );
        })}
      </BrowserRouter>
    </ContextStore>
  );
}
