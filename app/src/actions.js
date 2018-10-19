import axios from 'axios';

export const LOGGINGIN = 'LOGGINGIN';
export const LOGGEDIN = 'LOGGEDIN';
export const ERROR = 'ERROR';
export const LOGGINGOUT = 'LOGGINGOUT';
export const LOGGEDOUT = 'LOGGEDOUT';

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
            .catch(error => console.error(error));
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