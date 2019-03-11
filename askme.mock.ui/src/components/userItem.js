import React from 'react';
import PropTypes from 'prop-types';

function UserItem(props) {
    return (
        <li className="list-group-item">
            <div>{props.user.name}</div>
            <div>Number Of Questions: {props.user.numberOfQuestions}</div>       
        </li>
    );
}

UserItem.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
         numOfQuestions: PropTypes.number,
    }).isRequired,
};

export default UserItem;