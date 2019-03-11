import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import QuestionListItem from './questionListItem'

function QuestionList(props) {
  return (
    <ul className="list-group">
    <li className="list-group-item active">{props.title}</li>
    <div> { props.questions.map(question => (
          <QuestionListItem
            question={question}
            key={question._id}
          />
     ))}
     <br></br>
     </div>
  </ul>

  );
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  })),
};

export default QuestionList;