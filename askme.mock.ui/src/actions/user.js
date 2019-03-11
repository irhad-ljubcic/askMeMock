import callApi from '../util/apiCaller';
export const USER_QUESTIONS = 'USER_QUESTIONS';
export const USER_HOT = 'USER_HOT';


export function userQuestions(userQuestions) {
  return {
    type: USER_QUESTIONS,
    userQuestions,
  };
}

export function fetchUserQuestions() {
  return (dispatch) => {
    return callApi('users/questions').then(res => {
      dispatch(userQuestions(res.data.questions));
    });
  };
}
export function userHot(userHot) {
    return {
      type: USER_HOT,
      userHot,
    };
  }
  
  export function fetchUserHot() {
    return (dispatch) => {
      return callApi('users/hot').then(res => {
        console.log("result:",res);
        dispatch(userHot(res.data.users));
      });
    };
  }



