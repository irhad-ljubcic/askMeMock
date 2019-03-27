import React from 'react';
import classnames from 'classnames';

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      image_url: '',
      errors:{}
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
  componentWillReceiveProps(nextProps) {
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
    this.props.onProfileUpdate(this.state);
  };


  render() {
    const {errors} = this.state;
    return (
      <div>
        <div>
          <div className="row justify-content-md-center">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    placeholder="Username"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.username
                    })}
                    name="username"
                    onChange={this.handleInputChange}
                    value={this.state.username}>
                  </input>
                  {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                  </div>
                  <div className="form-group">
                  <input
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    name="email"
                    type="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}>
                  </input>
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
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