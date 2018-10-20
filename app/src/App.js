import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavLink, Route, withRouter} from 'react-router-dom';
import LogIn from './components/LogIn.js';
import DadJokes from './components/Jokes.js';
import Register from './components/Register.js';
import {connect} from 'react-redux';
import {logOut} from './actions.js';

const routeHome = '/';
const routeLogIn = '/log-in';
const routeDadJokes = '/dad-jokes';
export const routeRegister = '/register';

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
            &nbsp; | &nbsp;
            <button onClick={this.signout}>Log Out</button>
            <br/>
          </nav>
          <Route exact path={routeHome} component={Home} />
          <Route path={routeLogIn} component={LogIn} />
          <Route path={routeDadJokes} component={DadJokes} />
          <Route path={routeRegister} component={Register} />
        </header>
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem('jwttoken');
    this.props.logOut();
  }
}

const Home = () => {
  return(
    <div>
      <h1>Hello</h1>
    </div>
  )
}


const mapDispatchToProps = state => ({
  loggedIn: state.loggedIn
})

export default withRouter(connect(mapDispatchToProps, {logOut})(App));