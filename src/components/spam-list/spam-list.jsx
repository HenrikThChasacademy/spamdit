import React, { Fragment } from 'react'
import Spam from '../spam/spam';
import { useSetSpam } from '../../hooks/useSetSpam';
import ErrorFallback from '../error-fallback/error-fallback';
import { ErrorBoundary } from 'react-error-boundary'
function SpamList() {
    const { spamList } = useSetSpam();

    return (
        <Fragment>
            {spamList.map(spam => {
                return <ErrorBoundary 
                    key={spam.id}
                    FallbackComponent={ErrorFallback}>
                    <Spam 
                        key={spam.id}
                        spam={spam}/>
                    </ErrorBoundary>
            })
            }
        </Fragment>
    )
}

export default SpamList;