import React from 'react';
import axios from 'axios';

class Jokes extends React.Component{
    state = {
        jokes: []
    }

    render(){
        if(this.state.jokes.length>0){
            return(
                <div>
                    Jokes:
                    {this.state.jokes.map((dadJoke, index) => {
                        return(
                            <div key={index}>
                                <div>
                                    {dadJoke.setup}
                                </div>
                                <div>
                                    {dadJoke.punchline}
                                </div>
                                <br/>
                            </div>
                        )
                    })}
                </div>
            )
        }else{
            return(
                <div>
                    No dad jokes found. Are you sure you're logged in?
                </div>
            )
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('jwttoken');
        const options = {
            headers: {
                Authorization: token
            }
        };
        axios
            .get('http://localhost:3300/api/jokes', options)
            .then(response => {
                console.log(response);
                this.setState({jokes:response.data});
            })
            .catch(error => console.error(error));
    }
}

export default Jokes;