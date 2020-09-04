import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashoboard';
import { BrowserRouter, Route } from 'react-router-dom';

// every route will be added to the routes array

const routes = [ 
  {
      path: '/',
      component: Dashboard,
      key: 'dashboard'
  }  
]

ReactDOM.render( 
  <React.StrictMode>
    <BrowserRouter>
      {
        routes.map(route => {
          return <Route
                    component={route.component}
                    path={route.path}
                    key={route.key}
                  />
        })
      }
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


