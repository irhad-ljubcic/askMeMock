import callApi from '../util/apiCaller';
import { GET_ERRORS } from './types';
export const USER_QUESTIONS = 'USER_QUESTIONS';
export const USER_HOT = 'USER_HOT';
export const USER_QUESTIONS_LOAD_MORE = 'USER_QUESTIONS_LOAD_MORE';
export const USER_UPDATE = 'USER_UPDATE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export function userQuestions(userQuestions,page,isLastPage) {
  return {
    type: USER_QUESTIONS,
    userQuestions,
    page,
    isLastPage
  };
}
export function loadMore(userQuestions,page,isLastPage) {
  return {
    type: USER_QUESTIONS_LOAD_MORE,
    userQuestions,
    page,
    isLastPage
  };
}

export function fetchUserQuestions() {
  return (dispatch) => {
    return callApi('users/questions').then(res => {
      dispatch(userQuestions(res.data.questions,res.data.page,res.data.isLastPage));
    });
  };
}

export function loadMoreRequest(page) {
  return (dispatch) => {
    return callApi(`users/questions?page=${page}`).then(res => {
      dispatch(loadMore(res.data.questions,res.data.page,res.data.isLastPage));
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
        dispatch(userHot(res.data.users));
      });
    };
  }

  export function userUpdate(user) {
    return {
      type: USER_UPDATE,
      user,
    };
  }
  
  export function userUpdateRequest(user) {
    return (dispatch) => {
      return callApi('users/update','post',user).then(res => {
        if(res.status == 200){
          dispatch(userUpdate(res.data));
          dispatch({type: GET_ERRORS,payload: {}});
        }else{
          dispatch({type: GET_ERRORS,payload: res.data});
        }
        
      });
    };
  }
  export function userChangePassword(user) {
    return {
      type: CHANGE_PASSWORD,
      user
    };
  }
  
  export function userChangePasswordRequest(password) {
    return (dispatch) => {
      return callApi('users/update/password','post',password).then(res => {
        if(res.status == 200){
          dispatch(userChangePassword(res.data));
          dispatch({type: GET_ERRORS,payload: {}});
        }else{
          dispatch({type: GET_ERRORS,payload: res.data});
        }
      });
    };
  }



