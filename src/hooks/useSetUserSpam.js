import { useState, useEffect } from 'react';
import spamService from '../service/spamService';

export const useSetUserSpam = (id) => {
    const [userSpam, setUserSpam] = useState([]);

    useEffect(() => {
        let fetchSpam = async() => {
            const spam = await spamService.getSpamForUser(id);
            if (spam) {
                setUserSpam(spam);
            }
        }
        fetchSpam();
    }, [id]);

    return {
        userSpam
    }
}
