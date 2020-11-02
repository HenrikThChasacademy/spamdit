import { useState, useCallback } from 'react';
import userService from '../service/userService';

export const useSetUser = () => {
    const [currentUser, setCurrentUser] = useState({id: ""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUsername] = useState("");

    const handleLogin = useCallback(async () => {
        if (userName.length === 0) {
            return;
        }
        const createdUser = await userService.createUser({name: userName});
        if (createdUser) {
            setCurrentUser(createdUser);
            setIsLoggedIn(true);
        }
    }, [userName])

    const handleLogout = useCallback(async () => {
        setCurrentUser({id: ""});
        setIsLoggedIn(false);
    }, [])

    const handleUserInputChange = useCallback(async (userName) => {
        setUsername(userName);
    }, [])

    return {
        currentUser,
        userName,
        isLoggedIn,
        handleLogin,
        handleLogout,
        handleUserInputChange
    }
}