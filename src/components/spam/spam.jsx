import React, { useState, useEffect } from 'react';
import Comment from './comment/comment';
import PostComment from './post-comment/post-comment';
import './spam.scss';
import Container from 'react-bootstrap/Container';
import topicService from '../../service/topicService';

function Spam(props){
    // const [topic, setTopic] = useState({ spam: [] });

    // useEffect(() => {
    //     let fetchTopicText = async() => {
    //         const response = await topicService.getTopicById(props.spam.topicId);
    //         const topic = await response.data;
    //         setTopic(topic);
    //       }
    //       fetchTopicText();
    // }, [props.spam.topicId]);


    return(
        <Container className="spam-container">
            <div className="heading">
                <h2>{props.spam.topicId}</h2>
            </div>
            <div className="spam-text">
                <p>{props.spam.text}</p>
            </div>
            <br />
            <div className="spam-info">
                Spammed by {props.spam.userId} at {props.spam.date}
            </div>
            <hr />
            {
            props.comments &&
            props.comments.map((comment) => {
                return <Comment 
                    key={comment.date}
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