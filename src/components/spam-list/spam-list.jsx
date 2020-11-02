import React, { Fragment } from 'react'
import Spam from '../spam/spam';
import { useSetSpam } from '../../hooks/useSetSpam';

function SpamList() {
    const { spamList } = useSetSpam();

    return (
        <Fragment>
            {spamList.map(spam => {
                return <Spam 
                key={spam.id}
                spam={spam}
                />
            })
            }
        </Fragment>
    )
}

export default SpamList;