import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionList from '../components/questionList';
import { fetchHotQuestions } from '../actions/hotQuestion';

class HotQuestionContainer extends Component {
  
  componentDidMount() {
    this.props.fetchHotQuestions();
  }

  render() {
    return (
      <div>
        <QuestionList questions={this.props.hotQuestions} title = {this.props.title} />
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    hotQuestions: state.hotQuestions.data,
    title:"Hot Questions"
  };
}

HotQuestionContainer.propTypes = {
  hotQuestions: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  })),
  fetchHotQuestions: PropTypes.func,
};

export default connect(mapStateToProps, {fetchHotQuestions})(HotQuestionContainer);
