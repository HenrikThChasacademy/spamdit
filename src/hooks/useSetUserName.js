import { useEffect, useState} from 'react';
import userService from '../service/userService';

export const useSetUserName = (userId) => {
    const [userName, setUserName] = useState(null);
    const [userNameError, setUserNameError] = useState(false);

    useEffect(() => {
        let fetchUserName = async() => {
            const spamUser = await userService.getUserById(userId);
            if (spamUser) {
                setUserName(spamUser.name);
            } else {
                setUserNameError(true)
            }
        };
        fetchUserName();
    }, [userId])

    return {
        userName,
        userNameError
    }
}