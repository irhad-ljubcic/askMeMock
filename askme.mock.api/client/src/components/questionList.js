import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionListItem from './questionListItem'
import { handleRatingRequest } from '../actions/question'

function QuestionList(props) {
  return (
    <div>
      <h3>{props.title}</h3>    
      <div> {props.questions.map(question => (
        <QuestionListItem
          question={question}
          isAuth={props.isAuth}
          key={question._id}
          onRatingChange={props.onRatingChange}
        />
      ))}
        <br></br>
      </div>

    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onRatingChange: rating => {
      dispatch(handleRatingRequest(rating));
    },
  };
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  })),
};

export default connect(
  null,
  mapDispatchToProps
)(QuestionList);