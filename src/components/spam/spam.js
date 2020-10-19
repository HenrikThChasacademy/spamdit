import React, { Component } from 'react';
import Comment from './comment/comment';
import PostComment from './post-comment/post-comment'
import './_spam.sass';

class Spam extends Component {

    state = {
        textToPost: "",
        currentUser: "currentUser",
        spam: 
            {
                id:1,
                user:"spammer",
                topic:"How spam will change your life in 5 easy steps",
                text:"We all know spam is good for your health",
                date:1602845458048,
            },
        comments: [
            {
                id: 1,
                user: "spam_reader_2020", 
                text: "Your spam is fantastic", 
                date: 1602845458448, 
                comments: [{
                    id: 2,
                    user: "spam_reader_2020", 
                    text: "Your spam is fantastic", 
                    date: 1602845458948, 
                    comments: []
                }]
            }],
        showPostComment: false,
    }

    handleTextChange = (text) => {
        this.setState({textToPost: text});
    } 

    handlePostComment = () => {
        this.setState(state => ({
                comments: [...state.comments, this.createComment(state)],
                showPostComment: !state.showPostComment
        }));
    }

    createComment(state) {
        return {
            id:3, 
            user: state.currentUser,
            text: state.textToPost, 
            date: Date.now(), 
            comments:[] 
        };
    }

    handleShowPostComment = () => {
        this.setState(state => ({
            showPostComment: !state.showPostComment
        }))
    }
    

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return(

            <div className="spam-container">
                <div className="heading">
                    <h2>{this.state.spam.topic}</h2>
                </div>
                <div className="spam-text">
                    <p>{this.state.spam.text}</p>
                </div>
                <br />
                <div className="spam-info">
                    Spammed by {this.state.spam.user} at {this.state.spam.date}
                </div>
                <hr />
                {this.state.comments.map((comment) => {
                    return <Comment 
                        key={comment.date}
                        user={comment.user}
                        text={comment.text}
                        date={comment.date}
                        parent={this.state.spam.user}
                        comments={comment.comments}
                        />
                })}
                <button className="comment-button" onClick={this.handleShowPostComment}>
                    Comment
                </button>
                {
                    this.state.showPostComment &&
                    <PostComment 
                        handleTextChange={this.handleTextChange}
                        handlePostComment={this.handlePostComment}/>
                }
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}

export default Spam;