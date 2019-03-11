import callApi from '../util/apiCaller';


export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';


export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addQuestionRequest(question) {
  return (dispatch) => {
    return callApi('questions', 'post', {
      body: question.body
    }).then(res =>
       dispatch(addQuestion(res.data)));
  };
}

export function addQuestions(questions) {
  return {
    type: ADD_QUESTIONS,
    questions,
  };
}


export function fetchQuestions() {
  return (dispatch) => {
    return callApi('questions').then(res => {
      dispatch(addQuestions(res.data.questions));
    });
  };
}

export function fetchQuestion(id) {
  return (dispatch) => {
    return callApi(`questions/${id}`).then(res => dispatch(addQuestion(res.question)));
  };
}


