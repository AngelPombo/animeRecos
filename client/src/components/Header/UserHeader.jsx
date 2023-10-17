import {React, useContext} from 'react';
import { PostEntryButton } from '../Buttons/PostEntryButton';
import { UserHeaderProfile } from './UserHeaderProfile';
import sessionContext from '../../context/sessionContext';

function UserHeader () {

    const { logged, timeStamp, oneDayMs} = useContext(sessionContext);
    
        return (
            <section>
                {
                    (logged && (new Date().getTime() < (parseInt(timeStamp) + oneDayMs)))
                    &&
                    <section className='user-header'>
                        <UserHeaderProfile /> 
                        <PostEntryButton /> 
                    </section>
                }
            </section>
            
            
        );
}

export {UserHeader};
