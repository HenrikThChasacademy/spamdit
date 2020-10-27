import React, { useState, useEffect, useCallback } from 'react';
import Comment from './comment/comment';
import PostComment from './post-comment/post-comment';
import './spam.scss';
import Container from 'react-bootstrap/Container';
import topicService from '../../service/topicService';
import userService from '../../service/userService';
import commentService from '../../service/commentService';

function Spam(props){
    const [topic, setTopic] = useState(null);
    const [spamUserName, setSpamUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [showPost, setShowPost] = useState(false)

    useEffect(() => {
        let fetchTopicText = async() => {
            const topic = await topicService.getTopicById(props.spam.topicId);
            setTopic(topic.text);
        }
          
        let fetchUserName = async() => {
            const spamUser = await userService.getUserById(props.spam.userId);
            setSpamUser(spamUser.name);
        }

        let fetchComments = async() => {
            const comments = await commentService.getCommentForParent(props.spam.id);
            console.log(comments);
            setComments(comments);
        }

        fetchTopicText();
        fetchUserName();
        fetchComments();
    }, [props.spam.id, props.spam.topicId, props.spam.userId, setSpamUser, setTopic, setComments]);

    const toggleShowPost = useCallback(async () => {
        setShowPost(!showPost);
      }, [showPost])
    
    return(
        <Container className="spam-container">
            <div className="heading">
                <h2>{topic}</h2>
            </div>
            <div className="spam-text">
                <p>{props.spam.text}</p>
            </div>
            <br />
            <div className="spam-info">
                Spammed by {spamUserName} at {props.spam.dateCreated}
            </div>
            <hr />
            {
            comments.lenght !== 0 &&
            comments.map((comment) => {
                return <Comment 
                    key={comment.id}
                    comment={comment}
                    currentUserId={props.currentUserId}
                    text={comment.text}
                    date={comment.date}
                    parentId={props.spam.id}
                    parentUserId={props.userId}
                    dateCreated={comment.dateCreated}
                    comments={comment.comments}
                    handleTextChange={props.handleTextChange}
                    handlePostComment={props.handlePostComment}
                    handleShowCommentPostComment={comment.handleShowPostComment}
                    />
            })}
            <button className="comment-button" onClick={toggleShowPost}>
                Comment
            </button>
            {
                showPost &&
                <PostComment 
                    handleTextChange={(text) => props.handleTextChange({...props.newComment, 
                        text: text, userId: props.currentUserId, parentId: props.spam.id})}
                    handlePostComment={props.handlePostComment}/>
            }
        </Container>
    )
    
}

export default Spam;