import React from 'react';
import './post-comment.scss';
import Button from 'react-bootstrap/Button';

function PostComment(props) {

    return(
        <div>
            <div>
            <legend>Make a comment: </legend>
            <textarea className="comment-input" type="text"
                onChange={(e) => props.handleTextChange(e.target.value)} />
            </div>
            <Button variant="success" className="post-button" onClick={props.handlePostComment}>Post comment</Button>
            <Button variant="secondary" className="post-button" onClick={props.handleCancelPostComment}>Abort</Button>
        </div>
    )
}

export default PostComment;