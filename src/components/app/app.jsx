import React, { Component } from 'react';
import Spam from '../spam/spam';
import Menu from '../menu/menu';
import Spammer from '../spammer/spammer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import userService from '../../service/userService';
import spamService from '../../service/spamService';

class App extends Component {
    state = {
        currentUser: {id: ""},
        userName: "",
        spam: [],
        isLoggedIn: false,
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

    fetchSpam = async () => {
        let spam = await spamService.getSpam();
        if (spam) {
            this.setState({spam: spam})
        }
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
                    currentUserId={this.state.currentUser.id}
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
