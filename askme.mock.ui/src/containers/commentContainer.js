import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionSummary } from '../actions/comment';
import Navbar from '../components/navbar'
import QuestionSummary from '../components/questionSummary'

class CommentContainer extends Component {
  
  componentDidMount() {
    console.log("ID",this.props.match.params.id)
    this.props.fetchQuestionSummary(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <div>
        <Navbar />  
        <QuestionSummary question ={this.props.question} author= {this.props.author}/>
        </div>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    question: state.question.data,
    author:state.question.author
  };
}


export default connect(mapStateToProps,{fetchQuestionSummary})(CommentContainer);