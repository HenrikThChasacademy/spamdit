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
                    handleTextChange={(text) => props.handleTextChange({...props.newComment, 
                        text: text, userId: props.currentUserId, parentId: props.comment.id})}
                    handlePostComment={props.handlePostComment}
                    />
            }
            <div className="comment-reply-container">
            <hr />
            {
            comments.length !== 0 &&
            comments.map((comment) => {
                    return <Comment 
                        key={comment.id}
                        comment={comment}
                        currentUserId={props.currentUserId}
                        text={comment.text}
                        date={comment.date}
                        parentId={props.comment.Id}
                        parentUserId={props.userId}
                        dateCreated={comment.dateCreated}
                        comments={comment.comments}
                        handleTextChange={props.handleTextChange}
                        handlePostComment={props.handlePostComment}
                        handleShowCommentPostComment={comment.handleShowPostComment}
                        />
                })}
            </div>
        </div>
    )
    
}

export default Comment