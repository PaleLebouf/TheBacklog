import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import RegisterUser from "./components/register.component"
import Login from "./components/login.component"
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <RegisterUser />
        <Login/>
        <br />
       </div>
    </Router>
  );
}

export default App;
