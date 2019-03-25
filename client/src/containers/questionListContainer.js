import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionList from '../components/questionList';
import { fetchQuestions,loadMoreRequest } from '../actions/question';

class QuestionListContainer extends Component {
  
  componentDidMount() {
    this.props.fetchQuestions();
  }

  render() {
    return (
      <div>
        <div>
        <QuestionList  
        questions={this.props.questions}
        title = {this.props.title}
        isAuth= {this.props.isAuth}/>
        </div>
        {!this.props.isLastPage ?  <button className="btn btn-primary btn-sm btn-block" onClick={() => this.props.loadMoreRequest(this.props.page)}>LOAD MORE</button>: ''}
       </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    questions: state.questions.data,
    title:"Latest Questions",
    page:state.questions.page,
    isLastPage:state.questions.isLastPage,
    isAuth:state.auth.isAuthenticated
  };
}

QuestionListContainer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  })),
  fetchQuestions: PropTypes.func,
};

export default connect(mapStateToProps, {fetchQuestions,loadMoreRequest})(QuestionListContainer);
