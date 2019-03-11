import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionList from '../components/questionList';
import { fetchUserQuestions } from '../actions/user';
import Navbar from '../components/navbar'

class MyQuestionContainer extends Component {
  
  componentDidMount() {
    this.props.fetchUserQuestions();
  }

  render() {
    return (
      <div>
        <div>
        <Navbar />
        <div className="container" style={{ marginTop: '50px' }}>
        <QuestionList questions={this.props.userQuestions} title = {this.props.title} />
        </div>       
        </div>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    userQuestions: state.userQuestions.data,
    title:"My Questions"
  };
}

MyQuestionContainer.propTypes = {
  userQuestions: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  })),
  fetchUserQuestions: PropTypes.func,
};

export default connect(mapStateToProps, {fetchUserQuestions})(MyQuestionContainer);