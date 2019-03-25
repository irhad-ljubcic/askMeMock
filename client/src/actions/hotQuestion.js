import callApi from '../util/apiCaller';

export const HOT_QUESTIONS = 'HOT_QUESTIONS';


export function hotQuestions(hotQuestions) {
  return {
    type: HOT_QUESTIONS,
    hotQuestions,
  };
}

export function fetchHotQuestions() {
  return (dispatch) => {
    return callApi('questions/hot').then(res => {
      dispatch(hotQuestions(res.data.questions));
    });
  };
}



