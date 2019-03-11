import { connect } from 'react-redux';
import { addQuestionRequest } from '../actions/question';
import AddQuestion from '../components/addQuestion';

const mapDispatchToProps = dispatch => {
  return {
    onAddQuestion: question => {
      dispatch(addQuestionRequest(question)).then(
        window.location.href = '/home'
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddQuestion);