import React from 'react';
import Navbar from './navbar'

class AddQuestion extends React.Component {
  state = {
    body: '',
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.body.trim()) {
      this.props.onAddQuestion(this.state);
    }
  };


  render() {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ marginTop: '50px' }}>
          <div className="row justify-content-md-center">
            <div className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <textarea
                    cols="19"
                    rows="8"
                    placeholder="Body"
                    className="form-control"
                    name="body"
                    onChange={this.handleInputChange}
                    value={this.state.body}>
                  </textarea>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Add Question</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default AddQuestion;