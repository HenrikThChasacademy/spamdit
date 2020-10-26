import React, { Component } from 'react';
import Spam from '../spam/spam';
import Menu from '../menu/menu';
import Spammer from '../spammer/spammer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import userService from '../../service/userService';
import spamService from '../../service/spamService';
import topicService from '../../service/topicService';

class App extends Component {

    state = {
        textToPost: "",
        currentUser: "",
        userName: "",
        spam: [],
        showPostComment: false,
        isLoggedIn: false,
        newSpam: {},
        newTopic: {},
    }
    
    componentDidMount() {
        this.fetchSpam();
    }

    handleUserInputChange = (userName) => {
        this.setState({userName: userName})
    }

    handleLogin = async () => {
        if (this.state.userName.length === 0) {
            return;
        }
        const createdUser = await userService.createUser({name: this.state.userName});
        if (createdUser) {
            this.setState({currentUser: createdUser, isLoggedIn: true});
        }
    }

    handleLogout = () => {
        this.setState({currentUser: "", isLoggedIn: false});
    }

    handleSpammerTopicChange = (topic) => {
        this.setState(state => ({
            ...state.newTopic,
            newTopic: topic
        }));
    }

    handleSpammerChange = (spam) => {
        const newSpam = { ...spam, userId: this.state.currentUser.id};

        this.setState(state => ({
            ...state.newSpam,
            newSpam: newSpam
        }));
    }

    fetchSpam = async () => {
        let spam = await spamService.getSpam();
        if (spam) {
            this.setState({spam: spam})
        }
    }

    handleSaveSpammerSpam = async () => {
        let savedTopic = await topicService.createTopic(this.state.newTopic);
        if (savedTopic) {
            console.log(this.state.newSpam);
            let newSpam = this.createSpam(this.state.newSpam, savedTopic);
            console.log(newSpam);
            let savedSpam = await spamService.createSpam(newSpam);
            if (savedSpam) {
                this.fetchSpam();
            }
        }
        
    }

    createSpam(spam, topic) {
        return { ...spam, 
            userId: this.state.currentUser.id,
            topicId: topic.id,
            dateCreated: new Date()
            };
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
        return (
            <Container fluid className="app container">
                <Row className="heading">
                <h1>Hello Spammers!</h1>
                </Row>
                <Menu 
                    userName={this.state.userName}
                    isLoggedIn={this.state.isLoggedIn}
                    handleUserInputChange={this.handleUserInputChange}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    />
                <hr />
                <Spammer
                    newSpam={this.state.newSpam}
                    newTopic={this.state.newTopic}
                    handleSpammerChange={this.handleSpammerChange}
                    handleSpammerTopicChange={this.handleSpammerTopicChange}
                    handleSaveSpammerSpam={this.handleSaveSpammerSpam}
                    />
                {this.state.spam.map(spam => {
                    return <Spam 
                    key={spam.id}
                    spam={spam}
                    handleTextChange={this.handleTextChange}
                    handlePostComment={this.handlePostComment}/>
                })
                }
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </Container>
        );
    }
}
export default App;
