import {React, useContext} from 'react';
import { PostEntryButton } from '../Buttons/PostEntryButton';
import { UserHeaderProfile } from './UserHeaderProfile';
import sessionContext from '../../context/sessionContext';

function UserHeader () {

    const { logged } = useContext(sessionContext);
    
    
    if(logged){
        return (
            <section className='user-header'>
                <UserHeaderProfile /> 
                <PostEntryButton /> 
            </section>
        );
    } else {
        return <p>No estás logueado</p>
    }
    
        
}

export {UserHeader};
