import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import axios from 'axios';
import { render, screen } from '@testing-library/react';
import Comment from './comment';
import '@testing-library/jest-dom/extend-expect'
import { SPAMDIT_API_URL } from '../../../service/pathVariables';
import UserContext from '../../../context/user-context';
import UserSettingsContext from '../../../context/user-settings-context';

jest.mock('axios');

describe('Comment', () => {
    const VOTE_PATH = SPAMDIT_API_URL +"/vote";
    const COMMENT_PATH = SPAMDIT_API_URL +"/comment";
    const USER_PATH = SPAMDIT_API_URL +"/user";

    test('render Comment component', async () => {
        const currentUser= {id: ""};
        const userSettings = false;
        const user = { currentUser };
        const settings = { userSettings };
        const votes = [{isUpvote: true}, 
            {isUpvote: true}, {isUpvote: false}]
        const votePromise = Promise.resolve({ data: votes})
        const commentPromise = Promise.resolve({ data: [] })
        const userNamePromise = Promise.resolve({ data: {id:"", name:"User"}})
        axios.mockImplementationOnce((url) => {
            switch (url) {
                case VOTE_PATH+"/comment/1":
                    return votePromise;
                default:
                    return Promise.reject(new Error("not found"))
            }
        });
        axios.mockImplementationOnce((url) => {
            switch (url) {
                case USER_PATH+"/1":
                    return userNamePromise;
                default:
                    return Promise.reject(new Error("not found"))
            }
        });
        axios.mockImplementationOnce((url) => {
            switch (url) {
                case COMMENT_PATH+'/parent/1':
                    return commentPromise;
                default:
                    return Promise.reject(new Error("not found"))
            }
        });

        const comment = {id: "1", userId:"1", text:"This is a text"}
        render(<UserContext.Provider value={user}>
                <UserSettingsContext.Provider value={settings}>
                    <Router>
                        <Comment
                        comment={comment}
                        parentId={1}
                        parentUserName={"Parent"}
                        parentUserId={"2"}
                        dateCreated={new Date().toLocaleDateString()}
                        />
                    </Router>
                </UserSettingsContext.Provider>
            </UserContext.Provider>
            )
        expect(await screen.findByText(/This is a text/));
        expect(await screen.findByText(/User/));
        expect(await screen.findByText(/replied to/));
        expect(await screen.findByText(/Parent/));
    })

})