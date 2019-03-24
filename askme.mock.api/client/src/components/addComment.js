import React from 'react';

class AddComment extends React.Component {
  state = {
    body: '',
    question_id:''
  };
  componentDidMount(){
      this.setState({
        question_id: this.props.match.params.id,
        body:''
      })
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
        body:''
      })
    }
  };


  render() {
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
                    className="form-control"
                    name="body"
                    onChange={this.handleInputChange}
                    value={this.state.body}>
                  </textarea>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Add Comment </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddComment;