import React from 'react';
import {connect} from 'react-redux';
import {register} from '../actions.js';

class Register extends React.Component{
    state = {
        username: '',
        password: ''
    }

    render(){
        if(this.props.registering){
            return(
                <div>
                    Registering...
                </div>
            )
        }else if(this.props.registered){
            return(
                <div>
                    You are now registered. Try logging in.
                </div>
            )
        }else{
            return(
                <div>
                    Register
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor='username'>
                                Username
                            </label>
                            <input
                                type='text'
                                name='username'
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>
                                Password
                            </label>
                            <input
                                type='password'
                                name='password'
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type='submit'>
                            Register
                        </button>
                    </form>
                </div>
            )
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('Clicked register button');
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.register(user);
        this.setState({username:'', password:''});
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
    }
}

const mapDispatchToProps = state => ({
    registering: state.registering,
    registered: state.registered
});

export default connect(mapDispatchToProps, {register})(Register);