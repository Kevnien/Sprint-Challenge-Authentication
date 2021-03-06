import React from 'react';
import {connect} from 'react-redux';
import {logIn} from '../actions.js';
import {NavLink} from 'react-router-dom';
import {routeRegister} from '../App.js';

class LogIn extends React.Component{
    state = {
        username: '',
        password: ''
    };

    render(){
        if(this.props.loggedIn){
            return(
                <div>
                    Welcome {this.props.username}.
                </div>
            )
        }else if(this.props.loggingIn){
            return(
                <div>
                    Logging in...
                </div>
            )
        }else{
            return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor='username'>
                                Username
                            </label>
                            <input
                                type='text'
                                onChange={this.handleChange}
                                name='username'
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>
                                Password
                            </label>
                            <input
                                type='password'
                                onChange={this.handleChange}
                                name='password'
                            />
                        </div>
                        <button type='submit'>
                            Log in
                        </button>
                    </form>
                    <NavLink to={routeRegister}>Register</NavLink>
                </div>
            )
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.logIn(user);
        this.setState({username:'', password:''});
    }
}

const mapDispatchToProps = state => ({
    loggedIn: state.loggedIn,
    loggingIn: state.loggingIn,
    username: state.username
});

export default connect(mapDispatchToProps, {logIn})(LogIn);