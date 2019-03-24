import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

function CommentItem(props) {
    return (

        <div className="card" style={{ paddingTop: '0px' }}>
            <div className="card-header" style={{ backgroundColor: "rgb(0, 226, 255)", padding: '5px' }}>
                <span>
                    {props.comment.author.image_url ? <img style={{ height: '40px', width: '40px' }} className='rounded-circle' alt='' src={props.comment.author.image_url} /> : ''}
                </span>
                <span><strong style={{ color: 'white', paddingLeft: '20px' }}>{props.comment.author.name}</strong></span>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    {props.comment.body}
                </h5>
            </div>
            <div className="card-footer">
                {props.isAuth ?
                    <div>
                        <button style={{ marginRight: '3px', minWidth: '70px' }} onClick={() => props.onRatingChange({ id: props.comment._id, type: 'up' })} type="button" className="btn btn-success btn-sm">
                            <FontAwesomeIcon icon={faAngleUp} size="1x" color="white" style={{ float: 'left', marginTop: '4px' }} />
                            {props.comment.upvotes}
                        </button>
                        <button style={{ minWidth: '70px' }} onClick={() => props.onRatingChange({ id: props.comment._id, type: 'down' })} type="button" className="btn btn-danger btn-sm">
                            <FontAwesomeIcon icon={faAngleDown} size="1x" color="white" style={{ float: 'left', marginTop: '4px' }} />
                            <span style={{ marginLeft: '2px' }}>
                                {props.comment.downvotes}
                            </span> </button>
                    </div>

                    :
                    <div>
                        <button style={{ marginRight: '3px', minWidth: '70px' }} disabled type="button" className="btn btn-success btn-sm">
                            <FontAwesomeIcon icon={faAngleUp} size="1x" color="white" style={{ float: 'left', marginTop: '4px' }} />
                            {props.comment.upvotes}
                        </button>
                        <button style={{ minWidth: '70px' }} disabled type="button" className="btn btn-danger btn-sm">
                            <FontAwesomeIcon icon={faAngleDown} size="1x" color="white" style={{ float: 'left', marginTop: '4px' }} />
                            <span style={{ marginLeft: '2px' }}>
                                {props.comment.downvotes}
                            </span> </button>
                    </div>
                }
            </div>
        </div>
    );
}

CommentItem.propTypes = {
    comment: PropTypes.shape({
        body: PropTypes.string,
        upvotes: PropTypes.number,
        downvotes: PropTypes.number,
    }).isRequired,
};

export default CommentItem;