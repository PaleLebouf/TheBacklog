import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">TheBacklog</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/games" className="nav-link">Games</Link>
          </li>
          <li className="navbar-item">
          <Link to="/manga" className="nav-link">Manga</Link>
          </li>
          <li className="navbar-item">
          <Link to="/shows" className="nav-link">Shows</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}