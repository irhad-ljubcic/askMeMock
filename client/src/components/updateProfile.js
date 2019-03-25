import React from 'react';

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      image_url: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    this.setState({
      username: this.props.user.name,
      email: this.props.user.email,
      image_url: this.props.user.image_url ? this.props.user.image_url : ''
    })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onProfileUpdate(this.state);
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
                    placeholder="Username"
                    className="form-control"
                    name="username"
                    onChange={this.handleInputChange}
                    value={this.state.username}>
                  </input>
                  </div>
                  <div className="form-group">
                  <input
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}>
                  </input>
                  </div>
                  <div className="form-group">
                  <input
                    placeholder="Image Url"
                    className="form-control"
                    name="image_url"
                    onChange={this.handleInputChange}
                    value={this.state.image_url}>
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

export default UpdateProfile;