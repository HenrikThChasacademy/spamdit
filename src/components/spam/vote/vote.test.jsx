import React from 'react';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import Vote from './vote';
import '@testing-library/jest-dom/extend-expect'
import { SPAMDIT_API_URL } from '../../../service/pathVariables';

jest.mock('axios');

describe('Vote', () => {
    const VOTE_PATH = SPAMDIT_API_URL +"/vote";

    test('render Vote component', async () => {
        const votes = [{isUpvote: true}, 
            {isUpvote: true}, {isUpvote: false}]
        const spamPromise = Promise.resolve({ data: votes })
        const userPromise = Promise.resolve({ data: {isUpvote: true}})
        axios.mockImplementationOnce((url) => {
            switch (url) {
                case VOTE_PATH+"/spam/1/user/1":
                    return userPromise;
                default:
                    return Promise.reject(new Error("not found"))
            }
        });
        axios.mockImplementationOnce((url) => {
            switch (url) {
                case VOTE_PATH+"/spam/1":
                    return spamPromise;
                default:
                    return Promise.reject(new Error("not found"))
            }
        });
        render(<Vote 
            spamId={1} 
            currentUserId={1}
            />);
        expect(await screen.findByText(/Upvotes: +/));
        expect(await screen.findByText(/Downvotes: -/));
    })

    test('fetch vote for spam displayes number of votes', async () => {
        const votes = [{isUpvote: true}, 
            {isUpvote: true}, {isUpvote: false}]
        const spamPromise = Promise.resolve({ data: votes })
        const userPromise = Promise.resolve({ data: {id: 1, isUpvote: true}})
        axios.mockImplementationOnce((url) => {
            switch (url) {
                case VOTE_PATH+"/spam/1/user/1":
                    return userPromise;
                default:
                    return Promise.reject(new Error("not found"))
            }
        });
        axios.mockImplementationOnce((url) => {
            switch (url) {
                case VOTE_PATH+"/spam/1":
                    return spamPromise;
                default:
                    return Promise.reject(new Error("not found"))
            }
        });

        render(<Vote 
            spamId={1} 
            currentUserId={1}
            />);
 
        await act(() => spamPromise);
        await act(() => userPromise);
        expect(await screen.findByText(/Upvotes: +/));
        expect(await screen.findByText(/Downvotes: -/));
    })
})