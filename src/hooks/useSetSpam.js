import { useState, useEffect, useCallback } from 'react';
import spamService from '../service/spamService';

export const useSetSpam = () => {
    const [spamList, setSpamList] = useState([]);
    const fetchSpam = useCallback(async () => {
        const spam = await spamService.getSpam();
        if (spam) {
            console.log(spam)
            const sortedSpam = spam.sort((a, b) => 
                (  new Date(b.dateCreated) - new Date(a.dateCreated)))
            setSpamList(sortedSpam);
        }
    },[])

    useEffect(() => {
        fetchSpam();
    }, [fetchSpam])

    return {
        spamList
    }
}
