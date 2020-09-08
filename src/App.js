import React from "react";
import Dashboard from "./components/dashboard/Dashoboard";
import LoginPage from "./components/login/LoginPage";
import Canvas from "./components/canvas/Canvas";
import Entries from "./components/entries/Entries";
import { BrowserRouter, Route } from "react-router-dom";
import ContextStore from "./context/ContextStore";
import Events from "./components/events/Events";
import ShowEvent from "./components/events/showEvent/ShowEvent"
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
<<<<<<< HEAD

      key: "showEvent",
=======
      key: "showEvent"
>>>>>>> c7a257708f6269eeeec7206269e5b5c855bddbb3
    },
    {
      path: "/myevents",
      component: UserEvents,
<<<<<<< HEAD
      key: "myevents",
    },
=======
      key: "myevents"
    }
>>>>>>> c7a257708f6269eeeec7206269e5b5c855bddbb3
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
