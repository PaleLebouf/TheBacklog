import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import MainScreen from "./components/mainScreen.component";
import LoginComponent from "./components/account.component";
import GamesComponent from "./components/games.component";
import MangaComponent from "./components/manga.component";
import ShowsComponent from "./components/shows.component";


function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Route path="/" exact component={MainScreen} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/games" component={GamesComponent} />
        <Route path="/manga" component={MangaComponent} />
        <Route path="/shows" component={ShowsComponent} />
      </Router>
    </div>
  );
}

export default App;
