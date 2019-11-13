import React from 'react';
import './App.css';

//redux import
import {Provider} from 'react-redux'
import {store} from './redux';

//react router dom for routing purpose
import { BrowserRouter as Router, Route } from "react-router-dom";

//import all the require components
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'


function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="main">
        <Navbar/>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Dashboard} />
      </div>
      </Router>
    </Provider>
  );
}

export default App;
