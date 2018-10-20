import React from 'react';
import {connect} from 'react-redux';
import {getJokes} from '../actions.js';

class Jokes extends React.Component{render(){
        console.log(this.props.jokes);
        if(this.props.loggedIn){
            if(this.props.gotJokes){
                return(
                    <div>
                        Jokes:
                        {this.props.jokes.map((dadJoke, index) => {
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
            }else if(this.props.gettingJokes){
                return(
                    <div>
                        Loading dad jokes...
                    </div>
                )
            }else{
                return(
                    <div>
                        No jokes found.
                    </div>
                )
            }
        }else{
            return(
                <div>
                    You're not logged in. Please click on the Log In link to do so.
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
        this.props.getJokes(options);
    }
}

const mapDispatchToProps = state =>({
    loggedIn: state.loggedIn,
    jokes: state.jokes,
    gotJokes: state.gotJokes,
    gettingJokes: state.gettingJokes
});

export default connect(mapDispatchToProps, {getJokes})(Jokes);