import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function QuestionListItem(props) {
    return (
        <li className="list-group-item">
            <div></div>
            <Link to={`/question/${props.question._id}`} >
             {props.question.body}
             </Link>
            {!props.question.author.name ? '' : <div className="float-right">posted by: {props.question.author.name}</div> }       
            <div>
             <span style={{ marginRight: '10px'}}> <FontAwesomeIcon icon={faAngleUp} size="1x" color="green"/>   {props.question.upvotes}   </span> 
             <span> <FontAwesomeIcon icon={faAngleDown} size="1x"color="red"/>  {props.question.downvotes}  </span>
            </div>           
        </li>
    );
}

QuestionListItem.propTypes = {
    question: PropTypes.shape({
        body: PropTypes.string,
        upvotes: PropTypes.number,
        downvotes: PropTypes.number,
    }).isRequired,
};

export default QuestionListItem;