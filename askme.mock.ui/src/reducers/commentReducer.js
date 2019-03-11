import { ADD_QUESTION_SUMMARY, ADD_COMMENT } from '../actions/comment';

// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
  console.log('action',action);
  switch (action.type) {
    case ADD_QUESTION_SUMMARY :
      return {
        data: action.question
      };

    case ADD_COMMENT :
      return {
        data: state.data.comments.push(action.comment),
      };

    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default CommentReducer;