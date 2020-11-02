import { useState, useEffect, useCallback } from 'react';
import spamService from '../service/spamService';

export const useSetSpam = () => {
    const [spamList, setSpamList] = useState([]);

    const fetchSpam = useCallback(async () => {
        const spam = await spamService.getSpam();
        if (spam) {
            setSpamList(spam);
        }
    },[])

    useEffect(() => {
        fetchSpam();
    }, [fetchSpam])

    return {
        spamList
    }
}
