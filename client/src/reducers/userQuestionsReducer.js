import { USER_QUESTIONS,USER_QUESTIONS_LOAD_MORE } from '../actions/user';

// Initial State
const initialState = { 
  data: [],
  page:0,
  isLastPage:false, 
};

const UserQuestionReducer = (state = initialState, action) => {
  switch (action.type) {   
      case USER_QUESTIONS :
      return {
        data: action.userQuestions,
        page:action.page,
        isLastPage:action.isLastPage
      };
      case USER_QUESTIONS_LOAD_MORE :
      return {
        ...state,
        data: [...state.data,...action.userQuestions],
        page:action.page,
        isLastPage:action.isLastPage
      }
    default:
      return state;
  }
};

// Export Reducer
export default UserQuestionReducer;