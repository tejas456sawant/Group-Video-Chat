/** @format */

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./Components/CreateRoom";
import Room from "./Components/Room";
import firebase from "firebase/app";
import Login from "./Components/Login";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/create' exact component={CreateRoom} />
        <Route path='/room/:roomID' component={Room} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
