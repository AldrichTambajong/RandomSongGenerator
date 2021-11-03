import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import EventList from "./components/eventlist.component";
import EditEvents from "./components/editevents.component";
import CreateEvents from "./components/createevents.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>

        <Route path ="/" >
          <EventList></EventList>
        </Route>
        <Route path ="/edit/:id" component={EditEvents}/>
        <Route path ="/create" component={CreateEvents}/>
      </div>

    </Router>
  );
}

export default App;
