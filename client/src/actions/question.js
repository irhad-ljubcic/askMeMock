import callApi from '../util/apiCaller';


export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const QUESTION_RATING = 'QUESTION_RATING'
export const LOAD_MORE = 'LOAD_MORE'


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

export function addQuestions(questions,page,isLastPage = false) {
  return {
    type: ADD_QUESTIONS,
    questions,
    page,
    isLastPage
  };
}
export function loadMore(questions,page,isLastPage = false) {
  return {
    type: LOAD_MORE,
    questions,
    page,
    isLastPage
  };
}


export function fetchQuestions() {
  return (dispatch) => {
    return callApi('questions').then(res => {
      dispatch(addQuestions(res.data.questions,res.data.page,res.data.isLastPage));
    });
  };
}
export function loadMoreRequest(page) {
  return (dispatch) => {
    return callApi(`questions?page=${page}`).then(res => {
      dispatch(loadMore(res.data.questions,res.data.page,res.data.isLastPage));
    });
  };
}

export function fetchQuestion(id) {
  return (dispatch) => {
    return callApi(`questions/${id}`).then(res => dispatch(addQuestion(res.question)));
  };
}

export function handleRating(question) {
  return {
    type: QUESTION_RATING,
    question,
  };
}

export function handleRatingRequest(rating) {
  return (dispatch) => {
    return callApi('questions/rating','post',rating).then(res => {
      dispatch(handleRating(res.data));
    });
  };
}

