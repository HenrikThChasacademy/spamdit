import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import Spammer from '../spammer/spammer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SpamList from '../spam-list/spam-list';
import UserContext from '../../context/user-context';
import UserSettingsContext from '../../context/user-settings-context';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import TopicList from '../topic-list/topic-list';
import UserSpam from '../user-spam/user-spam';
import ErrorFallback from '../error-fallback/error-fallback';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
    const [currentUser, setCurrentUser] = useState({id: "", nrOfSpam: 0});
    const [userSettings, setUserSettings] = useState(false);
    const user = { currentUser, setCurrentUser };
    const settings = { userSettings, setUserSettings };

    return (
        <Container fluid className="app container">
            <Row className="heading">
                <h1>Hello Spammers!</h1>
            </Row>
                <UserContext.Provider value={user}>
                    <UserSettingsContext.Provider value={settings}>
                        <Login />
                        <Router>
                            <Menu />
                            <hr />
                            <Switch>
                                <ErrorBoundary FallbackComponent={ErrorFallback}>
                                    <Route exact path="/spam"><Spammer /></Route>
                                    <Route exact path="/spamlist"><SpamList /></Route>
                                    <Route exact path="/topiclist"><TopicList /></Route>
                                    <Route path="/userspam/:userId"><UserSpam /></Route>
                                    <Route exact path="/"><SpamList /></Route>
                                </ErrorBoundary>
                                <Route exact path="*" render={() => <h1> NOT FOUND</h1>} />
                            </Switch>
                            <Footer />
                        </Router>
                    </UserSettingsContext.Provider>
                </UserContext.Provider>
        </Container>
    );
}
export default App;
