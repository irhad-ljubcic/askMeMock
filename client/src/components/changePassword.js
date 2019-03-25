import React from 'react'

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: '',
      new_password:'',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}


  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onPasswordChange(this.state);
  };

  render() {
    return (
      <div>
        <div>
          <div className="row justify-content-md-center">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    placeholder="Old Password"
                    className="form-control"
                    name="old_password"
                    type= {'password'}
                    onChange={this.handleInputChange}
                    value={this.state.old_password}>
                  </input>
                </div>
                <div className="form-group">
                  <input
                    placeholder="New Password"
                    className="form-control"
                    name="new_password"
                    type= {'password'}
                    onChange={this.handleInputChange}
                    value={this.state.new_password}>
                  </input>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;