import { connect } from 'react-redux';
import { addCommentRequest } from '../actions/comment';
import AddComment from '../components/addComment';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: comment => {
      dispatch(addCommentRequest(comment))
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)((withRouter(AddComment)));