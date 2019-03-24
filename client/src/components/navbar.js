import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">Ask Me Mock</Link>
                 { this.props.auth.isAuthenticated ? 
                                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                 <ul className="navbar-nav mr-auto" >
                                 <li className="nav-item navbar-brand">
                                 <Link className="nav-link" to="/addQuestion">Ask !</Link>
                                 </li>
                                 <li className="nav-item navbar-brand">
                                 <Link className="nav-link" to="/myQuestions">My Questions</Link>
                                 </li>
                                 </ul>
                                 <ul className="navbar-nav ml-auto">  
                                 <img style={{height:'40px',width:'40px',marginRight:'5px'}} className='rounded-circle'  alt='' src={this.props.auth.user.image_url} />              
                                 <Link  className="navbar-brand" to="/profile">
                                     {this.props.auth.user.name}
                                 </Link>
                                 <a href="#" className="nav-link">
                                 <FontAwesomeIcon icon={faPowerOff} size="lg" onClick={this.onLogout.bind(this)}/>
                                 </a>              
                                 </ul>
                                 </div>
                                 :
                                 <ul className="navbar-nav mr-auto" >
                                 <li className="nav-item navbar-brand">
                                 <Link className="nav-link" to="/register">Sign Up !</Link>
                                 </li>
                                 <li className="nav-item navbar-brand">
                                 <Link className="nav-link" to="/login">Sign In !</Link>
                                 </li>
                                 </ul>      
                            } </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
       auth:state.auth
})


export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));