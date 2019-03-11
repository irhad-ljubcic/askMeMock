import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionList from '../components/questionList';
import { fetchQuestions } from '../actions/question';

class QuestionListContainer extends Component {
  
  componentDidMount() {
    this.props.fetchQuestions();
  }

  render() {
    return (
      <div>
        <QuestionList  questions={this.props.questions} title = {this.props.title}/>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    questions: state.questions.data,
    title:"Latest Questions"
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

export default connect(mapStateToProps, {fetchQuestions})(QuestionListContainer);
