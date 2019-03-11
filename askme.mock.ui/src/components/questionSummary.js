import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import CreateComment from '../containers/createComment'

function QuestionSummary(props) {
    return (   
      <div className="container" style={{ marginTop: '50px' }}>
       <li className="list-group-item">
            <h2 >
             {props.question.body}
             </h2>  
            <div>
             <span style={{ marginRight: '10px'}}> <FontAwesomeIcon icon={faAngleUp} size="1x" color="green"/>   {props.question.upvotes}   </span> 
             <span> <FontAwesomeIcon icon={faAngleDown} size="1x"color="red"/>  {props.question.downvotes}  </span>
            </div>           
        </li>
        <br></br>
        <CreateComment question_id = {props.question._id}/>
      </div>
        
    );
}


export default QuestionSummary;