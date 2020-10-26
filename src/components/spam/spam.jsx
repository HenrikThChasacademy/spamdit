import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        let fetchTopicText = async() => {
            const topic = await topicService.getTopicById(props.spam.topicId);
            console.log(topic);
            setTopic(topic.text);
        }
          
        let fetchUserName = async() => {
            const spamUser = await userService.getUserById(props.spam.userId);
            console.log(spamUser)
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
                    userId={comment.userId}
                    text={comment.text}
                    date={comment.date}
                    parentId={props.spam.id}
                    parentUser={props.spam.userId}
                    comments={comment.comments}
                    />
            })}
            <button className="comment-button" onClick={props.handleShowPostComment}>
                Comment
            </button>
            {
                props.showPostComment &&
                <PostComment 
                    handleTextChange={(text) => props.handleTextChange({...props.newComment, text: text, userId: props.userId, parentId: props.spam.id})}
                    handlePostComment={props.handlePostComment}/>
            }
        </Container>
    )
    
}

export default Spam;