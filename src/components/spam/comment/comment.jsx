import React, { useState, useEffect, useCallback } from 'react';
import './comment.scss';
import PostComment from '../post-comment/post-comment';
import userService from '../../../service/userService';
import commentService from '../../../service/commentService';

function Comment(props) {
    const [commentUserName, setSpamUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [showPost, setShowPost] = useState(false);
    
    useEffect(() => {
        let fetchUserName = async() => {
            const commentUser = await userService.getUserById(props.comment.userId);
            setSpamUser(commentUser.name);
        }

        let fetchComments = async() => {
            const comments = await commentService.getCommentForParent(props.comment.id);
            setComments(comments);
        }
        fetchUserName();
        fetchComments();
    }, [props.comment.id, props.comment.userId, setSpamUser, setComments]);

    const toggleShowPost = useCallback(async () => {
        setShowPost(!showPost);
    }, [showPost]) 
    
    return(
        <div className="comment-container">
            <b>{commentUserName}</b> replied to <b>{props.parentUser}</b> at {props.comment.dateCreated}
            <p>{props.comment.text}</p>
            <button className="reply-button" onClick={toggleShowPost}>
                Reply
            </button>
            {
                showPost &&
                <PostComment 
                    handleTextChange={(text) => props.handleTextChange({...props.comment, text: text, parentId: props.parentId})}
                    handlePostComment={props.handlePostComment}
                    />
            }
            <div className="comment-reply-container">
            <hr />
            {
            comments.length !== 0 &&
            comments.map((comment) => {
                    return <Comment 
                    key={comment.date}
                    user={comment.user}
                    text={comment.text}
                    date={comment.date}
                    parent={props.parentId}
                    comments={comment.comments}
                        />
                })}
            </div>
        </div>
    )
    
}

export default Comment