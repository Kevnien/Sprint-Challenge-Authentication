import axios from 'axios';

export const LOGGINGIN = 'LOGGINGIN';
export const LOGGEDIN = 'LOGGEDIN';
export const ERROR = 'ERROR';
export const LOGGINGOUT = 'LOGGINGOUT';
export const LOGGEDOUT = 'LOGGEDOUT';
export const GETTINGJOKES = 'GETTINGJOKES';
export const GOTJOKES = 'GOTJOKES';

export const logIn = user =>{
    return dispatch =>{
        dispatch({type:LOGGINGIN})
        axios
            .post('http://localhost:3300/api/login', user)
            .then(response => {
                localStorage.setItem(
                    'jwttoken',
                    response.data.token
                );
                dispatch({type:LOGGEDIN, payload:response.data.username})
            })
            .catch(error => dispatch({type:ERROR, payload:error}));
    }
};

export const logOut = () =>{
    return dispatch =>{
        dispatch({type:LOGGINGOUT})
            axios
                .get('http://localhost:8000/logout')
                .then(response=>{
                    dispatch({type:LOGGEDOUT})
                })
                .catch(err => dispatch({type:ERROR, payload:err.message}));
    }
};

export const getJokes = (options) => {
    return dispatch => {
        dispatch({type:GETTINGJOKES})
            axios
            .get('http://localhost:3300/api/jokes', options)
            .then(response => {
                dispatch({type:GOTJOKES, payload:response.data})
                // this.setState({jokes:response.data});
            })
            .catch(error => console.error(error));
    }
};