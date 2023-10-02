import React, { useContext } from 'react';
import sessionContext from '../../context/sessionContext';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import './UserHeaderProfile.css'



function UserHeaderProfile () {

    const baseUrl = import.meta.env.VITE_API_URL;
    const {userId} = useContext(sessionContext);
    const auth = window.localStorage.getItem("jwt");
    const {user, error, loading} = useUser(userId, auth);

    return (
        <>
            {
                !loading
                ?
                <div className='profile-header'>
                    <img  className= "profile-image" src={`${baseUrl}/avataruser/${user[0].avatar}`} alt={user[0].user_name} />
                    <Link className='profile-nick' to={`/perfil-usuario/${user[0].id}`}><h4>@{user[0].user_name}</h4></Link>
                    <p className='profile-badge'>{user[0].user_badge}</p>
                </div>
                :
                <p>Cargando...</p>
            }
            {error && <p>{error}</p>}
            
        </>
    );
}

export {UserHeaderProfile};