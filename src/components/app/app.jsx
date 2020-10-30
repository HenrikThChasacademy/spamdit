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
        currentUser: {id: ""},
        userName: "",
        spam: [],
        showPostComment: false,
        isLoggedIn: false,
        newComment: {},
        newSpam: {},
        newTopic: {},
        comments: [],
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
        const isValidUser = await this.checkLoggedInAndSetDefaultUser();
        if (!isValidUser) {
            return;
        }
        let savedTopic = await topicService.createTopic(this.state.newTopic);
        if (savedTopic) {
            let newSpam = this.createSpam(this.state.newSpam, savedTopic);
            let savedSpam = await spamService.createSpam(newSpam);
            if (savedSpam) {
                this.fetchSpam();
            }
        }
        
    }

    checkLoggedInAndSetDefaultUser = async () => {
        if (this.state.currentUser.id === "") {
            const createdUser = await userService.createUser({name: "Anonymous"});
            if (createdUser) {
                this.setState({currentUser: createdUser, isLoggedIn: true});
            } else {
                return false;
            }    
        } 
        return true;
    }

    createSpam(spam, topic) {
        return { ...spam, 
            userId: this.state.currentUser.id,
            topicId: topic.id,
            dateCreated: new Date()
            };
    }

    render() {

        return (
            <Container fluid className="app container">
                <Row className="heading">
        <h1>Hello Spammers!</h1>
                </Row>
                <Menu 
                    userName={this.state.currentUser.name}
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
                    currentUserId={this.state.currentUser.id}
                    />
                })
                }
            </Container>
        );
    }
}
export default App;
