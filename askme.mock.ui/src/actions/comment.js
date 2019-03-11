import callApi from '../util/apiCaller';
export const ADD_QUESTION_SUMMARY = 'ADD_QUESTION_SUMMARY';
export const ADD_COMMENT = 'ADD_COMMENT';

export function questionSummary(question) {
    return {
      type: ADD_QUESTION_SUMMARY,
      question,
    };
  }
  
  export function fetchQuestionSummary(id) {
    return (dispatch) => {
      return callApi('questions/summary','post',{id:id}).then(res => {
        console.log("RES:",res);
        dispatch(questionSummary(res.data.question));
      });
    };
  }
  export function addComment(comment) {
      return {
        type: ADD_COMMENT,
        comment,
      };
    }
    
    export function addCommentRequest(comment) {
      return (dispatch) => {
        return callApi('questions/comment','post',comment).then(res => {
          console.log("result:",res);
          dispatch(addComment(res.data.comment));
        });
      };
    }