import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
import callApi from '../util/apiCaller';

export const registerUser = (user, history) => dispatch => {
    return callApi('users/register','post', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    return callApi('users/login','post', user)
            .then(res => {
                switch (res.status) {
                    case 200:
                    const { token } = res.data;
                    localStorage.setItem('jwtToken', token);
                    const decoded = jwt_decode(token);
                    dispatch(setCurrentUser(decoded));
                    break;
                    case 400:
                    dispatch({
                        type: GET_ERRORS,
                        payload: res.data.error
                    });
                    break;
                    case 401:
                        window.location.href = '/login'
                        break;
                    default:
                    dispatch({
                        type: GET_ERRORS,
                        payload: res.data.error
                    });
                    break;
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}));
    if(history){
      history.push('/');
    }
    
}