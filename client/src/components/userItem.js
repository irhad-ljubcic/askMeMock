import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";

function UserItem(props) {
    return (
        <div className="card" style={{paddingTop:'0px'}}>
        <div className="card-header" style={{backgroundColor:"rgb(0, 226, 255)",padding:'5px'}}>
        <span>
        {props.user.image_url ? <img style={{height:'40px',width:'40px'}} className='rounded-circle'  alt='' src={props.user.image_url} /> : '' }  
        </span>
        <span><strong style={{color:'white',paddingLeft:'20px'}}>{props.user.name}</strong></span>
        </div>
        <div className="card-footer">
        <button style={{marginRight:'3px',minWidth:'70px'}} disabled type="button" className="btn btn-success btn-sm">
             <FontAwesomeIcon icon={faStar} size="1x" color="white" style={{float:'left',marginTop:'4px'}}/>  
             {props.user.numberOfQuestions}    
             </button>
        </div>
    </div>
    );
}

UserItem.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        numberOfQuestions: PropTypes.number,
    }).isRequired,
};

export default UserItem;