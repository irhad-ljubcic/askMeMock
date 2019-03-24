import { ADD_QUESTION, ADD_QUESTIONS, QUESTION_RATING,LOAD_MORE } from '../actions/question';

// Initial State
const initialState = { 
  data: [],
  page:0,
  isLastPage:false, 
};

const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION :
      return {
        ...state,
        data: [action.question, ...state.data],
        
      };

    case ADD_QUESTIONS :
      return {
        ...state,
        data:action.questions,
        page:action.page,
        isLastPage:action.isLastPage
      };
      case QUESTION_RATING :
      const newData = state.data.map(item => {      
        if(item._id === action.question._id){
          return action.question
        }
        return item
      })
      return {
        ...state,
        data:newData
      }
      case LOAD_MORE : 
      return {
        data:state.data.concat(action.questions),
        page:action.page,
        isLastPage:action.isLastPage,
      }

    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default QuestionReducer;