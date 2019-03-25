import React from 'react';
import PropTypes from 'prop-types';

import {handleRatingRequest} from '../actions/comment'
import { connect } from 'react-redux';
// Import Components
import CommentItem from './commentItem'

function CommentList(props) {
  return (
    <ul className="list-group">
    {props.comments ? 
    <div> { props.comments.map(comment => (
          <CommentItem
            comment={comment}
            key={comment._id}
            onRatingChange = {props.onRatingChange}
            isAuth ={props.isAuth}
          />
     ))}
     <br></br>
     </div>
      : <span>NO COMMENTS</span>
    }
  </ul>

  );
}
const mapDispatchToProps = dispatch => {
  return {
    onRatingChange: rating => {
      dispatch(handleRatingRequest(rating));
    }
  };
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  })),
};

export default connect(
  null,
  mapDispatchToProps
)(CommentList);