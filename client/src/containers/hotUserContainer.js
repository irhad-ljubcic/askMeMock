import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserList from '../components/userList';
import { fetchUserHot } from '../actions/user';

class UserHotContainer extends Component {
  
  componentDidMount() {
    this.props.fetchUserHot();
  }

  render() {
    return (
      <div>
        <UserList users={this.props.users} />
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    users: state.user.data,
  };
}

UserHotContainer.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    numberOfQuestions: PropTypes.number,
  })),
  fetchUserHot: PropTypes.func,
};

export default connect(mapStateToProps, {fetchUserHot})(UserHotContainer);
