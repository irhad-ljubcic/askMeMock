import { ADD_QUESTION, ADD_QUESTIONS } from '../actions/question';

// Initial State
const initialState = { data: [] };

const QuestionReducer = (state = initialState, action) => {
  console.log('action',action);
  switch (action.type) {
    case ADD_QUESTION :
      return {
        data: [action.question, ...state.data],
      };

    case ADD_QUESTIONS :
      return {
        data: action.questions,
      };

    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default QuestionReducer;