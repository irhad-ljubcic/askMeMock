import { connect } from 'react-redux';
import { addQuestionRequest } from '../actions/question';
import AddQuestion from '../components/addQuestion';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    onAddQuestion: (question,history) => {
      dispatch(addQuestionRequest(question)).then(() => {
        history.push('/')
      }       
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)((withRouter(AddQuestion)));