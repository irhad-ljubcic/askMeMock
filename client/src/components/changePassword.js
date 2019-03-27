import React from 'react';
import classnames from 'classnames';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: '',
      new_password:'',
      errors:{}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.onPasswordChange(this.state);
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
                    placeholder="Old Password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.old_password
                    })}
                    name="old_password"
                    type= {'password'}
                    onChange={this.handleInputChange}
                    value={this.state.old_password}>
                  </input>
                  {errors.old_password && (<div className="invalid-feedback">{errors.old_password}</div>)}
                </div>
                <div className="form-group">
                  <input
                    placeholder="New Password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.new_password
                    })}
                    name="new_password"
                    type= {'password'}
                    onChange={this.handleInputChange}
                    value={this.state.new_password}>
                  </input>
                  {errors.new_password && (<div className="invalid-feedback">{errors.new_password}</div>)}
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