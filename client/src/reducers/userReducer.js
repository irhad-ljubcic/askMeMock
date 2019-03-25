import { USER_HOT } from '../actions/user';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {   
      case USER_HOT :
      return {
        data: action.userHot,
      };
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default UserReducer;