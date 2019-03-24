import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UpdateProfile from '../components/updateProfile';
import ChangePassword from '../components/changePassword';
import { userUpdateRequest, userChangePasswordRequest } from '../actions/user';
import Navbar from '../components/navbar'

class ProfileContainer extends Component {

    constructor() {
        super();
    
        this.state = {
          showUpdateProfileForm: false,
          showChangePasswordForm:false,
        }
        this.toggleUpdateProfile = this.toggleUpdateProfile.bind(this);
        this.toggleChangePassword= this.toggleChangePassword.bind(this);
        
    }
    toggleUpdateProfile = () => {
        console.log("upd")
        this.setState({
          showUpdateProfileForm: !this.state.showUpdateProfileForm,
          showChangePasswordForm: false,
        });
      };
      toggleChangePassword = () => {
        this.setState({
          showUpdateProfileForm: false,
          showChangePasswordForm: !this.state.showChangePasswordForm,
        });
      };
    componentWillReceiveProps() {
        this.setState({
            showUpdateProfileForm: false,
            showChangePasswordForm: false,
          });
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className='container'>
                    <div className='row justify-content-md-center'>
                        <div className="col-md-8">
                            <div className="card hovercard">
                                <div className="cardheader">
                                </div>
                                <div className="avatar">
                                    <img alt="" src={this.props.user.image_url ? this.props.user.image_url : 'https://b.kisscc0.com/20180718/urw/kisscc0-ninja-computer-icons-samurai-youtube-avatar-ninja-5b4ed903c2dd20.4931332915318940197982.jpg'} />
                                </div>
                                <div className="info">
                                    <div className="title">
                                        <h2 href="">{this.props.user.name}</h2>
                                    </div>
                                    <div className="title">
                                        <p href="">{this.props.user.email}</p>
                                    </div>
                                    
                                </div>
                                <div className="bottom">
                                   <button className='btn btn-info' onClick={() => this.toggleUpdateProfile()}>Update Profile </button>
                                   <button style={{marginLeft:'5px'}} className='btn btn-info' onClick={() => this.toggleChangePassword()}>Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>                  
                   
                
                </div>
                <div className='container'>
                {this.state.showUpdateProfileForm ? 
                <UpdateProfile user={this.props.user} onProfileUpdate = {this.props.onProfileUpdate}/>
                : ''}                
                </div>
                <div className='container'>
                {this.state.showChangePasswordForm ? 
                <ChangePassword onPasswordChange = {this.props.onPasswordChange}/>
                : ''}                
                </div>
            </div>
        );
    }
}


// Retrieve data from store as props
const  mapStateToProps = state => {
    return {
        user: state.auth.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
      onProfileUpdate: user => {
        dispatch(userUpdateRequest(user))
      },
      onPasswordChange: password => {
         dispatch(userChangePasswordRequest(password))
      }
    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(ProfileContainer);