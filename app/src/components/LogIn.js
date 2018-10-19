import React from 'react';
import axios from 'axios';

class LogIn extends React.Component{
    state = {
        username: '',
        password: ''
    };

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor='username'>
                        Username
                    </label>
                    <input
                        tpye='text'
                        onChange={this.handleChange}
                        name='username'
                    />
                </div>
                <div>
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input
                        tpye='password'
                        onChange={this.handleChange}
                        name='password'
                    />
                </div>
                <button type='submit'>
                    Log in
                </button>
            </form>
        )
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        axios
            .post('http://localhost:3300/api/login', this.state)
            .then(response => {
                console.log(response.data);
                localStorage.setItem(
                    'jwttoken',
                    response.data.token
                );
            })
            .catch(error => console.error(error));
    }
}

export default LogIn;