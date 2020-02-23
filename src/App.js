import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import RegisterUser from "./components/register.component"
import Login from "./components/login.component"
import CreateShow from "./components/createshow.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <RegisterUser />
        <Login/>
        <CreateShow/>
        <br />
       </div>
    </Router>
  );
}

export default App;
