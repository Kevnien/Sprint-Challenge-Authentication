import {ERROR, LOGGINGIN, LOGGEDIN, LOGGINGOUT, LOGGEDOUT, GETTINGJOKES, GOTJOKES} from './actions.js';

const initialState = {
    loggingIn: false,
    loggedIn: false,
    username: '',
    jokes: [],
    gettingJokes: false,
    gotJokes: false,
    error: null
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case LOGGINGIN:
            return{
                loggingIn: true
            }
        case LOGGEDIN:
            return{
                loggingIn: false,
                loggedIn: true,
                username: action.payload
            }
        case LOGGINGOUT:
            return{
                loggingIn: true,
            }
        case LOGGEDOUT:
            return{
                loggedIn: false,
                username: ''
            }
            case GETTINGJOKES:
                return{
                    ...state,
                    gettingJokes: true
                }
            case GOTJOKES:
                return{
                    ...state,
                    gettingJokes: false,
                    gotJokes: true,
                    jokes: action.payload
                }
            case ERROR:
                console.error(action.payload);
                return{
                    error: action.payload
                }
            default:
                return state;
            }
        };

export default reducer;