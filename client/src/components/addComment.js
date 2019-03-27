import React from 'react';
import classnames from 'classnames';

class AddComment extends React.Component {
  state = {
    body: '',
    question_id: '',
    errors: {}
  };

  componentDidMount() {
    this.setState({
      question_id: this.props.match.params.id,
      body: '',
      errors: {}
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps,"props");
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.body.trim()) {
      this.props.onAddComment(this.state);
      this.setState({
        body: ''
      })
    }
  };


  render() {
    const {errors} = this.state;
    return (
      <div>
        <div>
          <div className="row justify-content-md-center">
            <div className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <textarea
                    cols="19"
                    rows="2"
                    placeholder="Comment"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.body
                    })}
                    name="body"
                    onChange={this.handleInputChange}
                    value={this.state.body}>
                  </textarea>
                  {errors.body && (<div className="invalid-feedback">{errors.body}</div>)}
                </div>
                {!this.state.body ? 
                <div className="form-group">
                  <button disabled type="submit" className="btn btn-primary">Add Comment </button>
                </div>:
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Add Comment </button>
                </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddComment;