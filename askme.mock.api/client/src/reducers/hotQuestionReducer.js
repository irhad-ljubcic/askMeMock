import { HOT_QUESTIONS } from '../actions/hotQuestion';
import { QUESTION_RATING } from '../actions/question'

// Initial State
const initialState = { data: [] };

const HotQuestionReducer = (state = initialState, action) => {
  switch (action.type) {   
      case HOT_QUESTIONS :
      return {
        data: action.hotQuestions,
      };
      case QUESTION_RATING :
      let findAny = false; 
      if(state.data.length > 0){
        const newData = state.data.map(item => {      
          if(item._id === action.question._id){
            findAny = true;
            return action.question
          }
          return item
        })
        newData.sort(function(a,b){return b.upvotes - a.upvotes})
        return !findAny && state.data[state.data.length -1].upvotes < action.question.upvotes  ? {data: []} : {data: newData}
      }
      
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default HotQuestionReducer;