import { useEffect, useState} from 'react';
import userService from '../service/userService';

export const useSetUserName = (userId) => {
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        let fetchUserName = async() => {
            const spamUser = await userService.getUserById(userId);
            setUserName(spamUser.name);
        };
        fetchUserName();
        return () => {
        };
    }, [userId])

    return {
        userName
    }
}