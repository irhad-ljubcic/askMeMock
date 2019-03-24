import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionSummary } from '../actions/comment';
import { handleRatingRequest } from "../actions/question";
import Navbar from '../components/navbar'
import QuestionSummary from '../components/questionSummary'

class CommentContainer extends Component {
  
  componentWillMount() {
    this.props.fetchQuestionSummary(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <div>      
        <Navbar />
        { this.props.question.length == 0 ? <div>Loading ...</div> : <QuestionSummary question ={this.props.question} onRatingChange = {this.props.onRatingChange} isAuth={this.props.isAuth} />}       
        </div>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    question: state.question.data,
    isAuth:state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onRatingChange: rating => {
      dispatch(handleRatingRequest(rating));

    },
    fetchQuestionSummary:id => {
      dispatch(fetchQuestionSummary(id));
    }
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(CommentContainer);