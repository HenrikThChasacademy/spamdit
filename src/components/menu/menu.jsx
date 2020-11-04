import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <ul className="navbar-nav mr-auto">
                    <li className = "nav-item">
                        <Link className="nav-link" to ="/spam">Spam</Link>
                    </li>
                    <li className = "nav-item">
                        <Link className="nav-link" to ="/spamlist">SpamList</Link>
                    </li>
                    <li className = "nav-item">
                        <Link className="nav-link" to ="/topiclist">TopicList</Link>
                    </li>
                </ul>
        </nav>
    )
}

export default Menu;