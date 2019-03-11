import { HOT_QUESTIONS } from '../actions/hotQuestion';

// Initial State
const initialState = { data: [] };

const HotQuestionReducer = (state = initialState, action) => {
  switch (action.type) {   
      case HOT_QUESTIONS :
      return {
        data: action.hotQuestions,
      };
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default HotQuestionReducer;