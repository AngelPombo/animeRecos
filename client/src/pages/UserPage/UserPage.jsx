import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { UserProfile } from '../../components/UserProfile/UserProfile';

function UserPage() {

    const token = window.localStorage.getItem("jwt");
    const {id} = useParams();
    
    const {user, error, loading} = useUser(id, token);

    if(loading) return <p>Cargando...</p>;
    if(error) return <p>{error}</p>;

    return (
        <UserProfile user={user}/>
    )
}

export {UserPage};
