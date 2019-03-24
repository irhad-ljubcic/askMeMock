import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import hotQuestionReducer from './hotQuestionReducer';
import userReducer from './userReducer';
import userQuestionReducer from './userQuestionsReducer';
import commentReducer from './commentReducer';

export default combineReducers({
    errors: errorReducer,
    auth:authReducer,
    questions:questionReducer,
    hotQuestions:hotQuestionReducer,
    user:userReducer,
    userQuestions:userQuestionReducer,
    question:commentReducer
});