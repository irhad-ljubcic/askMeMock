import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import UserItem from './userItem'

function UserList(props) {
  return (
    <ul className="list-group">
    <li className="list-group-item active">Popular Users</li>
    <div> { props.users.map(user => (
          <UserItem
            user={user}
            key={user._id}
          />
     ))}
     </div>
  </ul>

  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    numberOfQuestions: PropTypes.number,
  })),
};

export default UserList;