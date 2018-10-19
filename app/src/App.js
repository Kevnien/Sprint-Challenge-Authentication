import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavLink, Route} from 'react-router-dom';
import LogIn from './components/LogIn.js';
import DadJokes from './components/Jokes.js';

const routeHome = '/';
const routeLogIn = '/log-in';
const routeDadJokes = '/dad-jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            <NavLink to={routeHome}>Home</NavLink>
            &nbsp; | &nbsp;
            <NavLink to={routeLogIn}>Log In</NavLink>
            &nbsp; | &nbsp;
            <NavLink to={routeDadJokes}>Dad Jokes</NavLink>
          </nav>
          <Route exact path={routeHome} component={Home} />
          <Route path={routeLogIn} component={LogIn} />
          <Route path={routeDadJokes} component={DadJokes} />
        </header>
      </div>
    );
  }
}

const Home = () => {
  return(
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default App;
