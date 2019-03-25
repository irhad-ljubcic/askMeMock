import { ADD_QUESTION_SUMMARY, ADD_COMMENT, COMMENT_RATING } from '../actions/comment';
import { QUESTION_RATING } from '../actions/question'

// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION_SUMMARY:
      return {
        data: action.question
      };

    case ADD_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          comments: [...state.data.comments, action.comment]
        }
      };

     case QUESTION_RATING:
     return {
      ...state,
      data: {
        ...state.data,
        upvotes:action.question.upvotes,
        downvotes:action.question.downvotes
      }
     }
     case COMMENT_RATING:
     const newData = state.data.comments.map(item => {     
      if(item._id === action.comment._id){
        return action.comment
      }
      return item
    })
     return {
      ...state,
      data: {
        ...state.data,
        comments:newData
      }
     }

    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default CommentReducer;