import React from "react";
import Dashboard from "./components/Dashoboard";
import LoginPage from "./components/login/LoginPage";
import Canvas from "./components/canvas/Canvas";
import { BrowserRouter, Route } from "react-router-dom";
import ContextStore from "./context/ContextStore";

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
      key: "canvas"
    }
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
