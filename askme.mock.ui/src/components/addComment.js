import React from 'react';

class AddComment extends React.Component {
  state = {
    body: '',
    question_id:''
  };
  componentDidMount(){
      console.log(this.props,"PROPO")
      this.state.question_id = this.props.question_id;
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