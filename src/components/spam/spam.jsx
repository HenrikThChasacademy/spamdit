import React, { useState, useEffect, useCallback } from 'react';
import Comment from './comment/comment';
import PostComment from './post-comment/post-comment';
import './spam.scss';
import Button from 'react-bootstrap/Button';
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
            setComments(comments);
        }

        fetchTopicText();
        fetchUserName();
        fetchComments();
    }, [props.spam.id, props.spam.topicId, props.spam.userId, setSpamUser, setTopic, setComments]);

    const toggleShowPost = useCallback(async () => {
        setShowPost(!showPost);
      }, [showPost])
      
      const handlePostComment = useCallback(async () => {
        const newComment = await props.handlePostComment();
        console.log(comments);
        console.log(newComment);
        let newComments = [...comments, newComment];
        console.log(newComments);
        setComments(newComments);
        toggleShowPost();
    }, [comments, props, toggleShowPost])

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
                    text={comment.text}
                    date={comment.date}
                    parentId={props.spam.id}
                    parentUserId={props.userId}
                    parentUserName={spamUserName}
                    dateCreated={comment.dateCreated}
                    comments={comment.comments}
                    handleTextChange={props.handleTextChange}
                    handlePostComment={props.handlePostComment}
                    />
            })}
            {
                !showPost &&
                <Button variant='primary' className="comment-button" onClick={toggleShowPost}>
                    Comment
                </Button>
            }
            {
                showPost &&
                <PostComment 
                    handleTextChange={(text) => props.handleTextChange({...props.newComment, 
                        text: text, parentId: props.spam.id})}
                    handlePostComment={handlePostComment}
                    handleCancelPostComment={toggleShowPost}
                    />
            }
        </Container>
    )
    
}

export default Spam;