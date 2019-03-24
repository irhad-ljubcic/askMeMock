import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import UserItem from './userItem'

function UserList(props) {
  return ( 
    <div className="container" style={{ marginTop: '23px' }}>
    <h3>Popular Users</h3>  
    <div> { props.users.map(user => (
          <UserItem
            user={user}
            key={user._id}
          />
     ))}
     </div>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    numberOfQuestions: PropTypes.number,
  })),
};

export default UserList;