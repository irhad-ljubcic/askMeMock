import { USER_QUESTIONS } from '../actions/user';

// Initial State
const initialState = { data: [] };

const UserQuestionReducer = (state = initialState, action) => {
  switch (action.type) {   
      case USER_QUESTIONS :
      return {
        data: action.userQuestions,
      };
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default UserQuestionReducer;