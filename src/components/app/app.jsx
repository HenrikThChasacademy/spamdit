import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import Spammer from '../spammer/spammer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SpamList from '../spam-list/spam-list';
import UserContext from '../../context/user-context';
import Menu from '../menu/menu';
import TopicList from '../topic-list/topic-list';
function App(props) {
    const [currentUser, setCurrentUser] = useState({id: ""});
    const value = { currentUser, setCurrentUser };

    return (
        <Container fluid className="app container">
            <Row className="heading">
                <h1>Hello Spammers!</h1>
            </Row>
            <UserContext.Provider value={value}>
                <Login />
                <Router>
                    <Menu />
                    <hr />
                    <Switch>
                        <Route exact path="/spam"><Spammer /></Route>
                        <Route exact path="/spamlist"><SpamList /></Route>
                        <Route exact path="/topiclist"><TopicList /></Route>
                        <Route exact path="/"><SpamList /></Route>
                        <Route exact path="*" render={() => <h1> NOT FOUND</h1>} />
                    </Switch>
                </Router>
            </UserContext.Provider>
        </Container>
    );
}
export default App;
