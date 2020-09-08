import React from "react";
import Dashboard from "./components/Dashoboard";
import LoginPage from "./components/login/LoginPage";
import Canvas from "./components/canvas/Canvas";
import Entries from "./components/entries/Entries";
import { BrowserRouter, Route } from "react-router-dom";
import ContextStore from "./context/ContextStore";
import LocationSearch from "./components/locationSearch/LocationSearch";

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
      path: "/location",
      component: LocationSearch,
      key: "location",
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
            />
          );
        })}
      </BrowserRouter>
    </ContextStore>
  );
}
