import React, { Component } from 'react';
import { BrowserRouter as Router,
  Route,
  Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import CreateQuestion from './containers/createQuestion';
import MyQuestionContainer from './containers/myQuestionContainer';
import CommentContainer from './containers/commentContainer';
import ProfileContainer from './containers/ProfileContainer';

import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(''));
    window.location.href = '/home'
  }
}
const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().auth.isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
);

class App extends Component { 
  render() {
    return (
      <Provider store={store}>     
        <Router>
          <div>
            <Route exact path="/login" component={Login} />  
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} /> 
            <Route path='/home'  component={Home} /> 
            <ProtectedRoute path='/addQuestion'  component={CreateQuestion} /> 
            <ProtectedRoute path='/myQuestions'  component={MyQuestionContainer} /> 
            <Route path='/question/:id'  component={CommentContainer} />    
            <Route path='/profile'  component={ProfileContainer} />           
          </div>
        </Router>        
      </Provider>
    );
  }
}

export default App;