import { SET_CURRENT_USER } from '../actions/types';
import { USER_UPDATE, CHANGE_PASSWORD } from '../actions/user';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case USER_UPDATE:
            return {
                ...state,
                user: action.user
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                user:action.user
            }
        default:
            return state;
    }
}