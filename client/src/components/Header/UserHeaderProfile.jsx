import React, { useContext } from 'react';
import sessionContext from '../../context/sessionContext';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import './UserHeaderProfile.css'
import { ThreeDots } from "react-loader-spinner";



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
                    {
                        user[0] && 
                        <>
                            {
                                user[0].avatar ? <img  className='avatar' src={`${baseUrl}/avataruser/${user[0].avatar}`} alt={user[0].user_name} />
                                :
                                <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={user[0].user_name}></img> 
                            }
                            <Link className='profile-nick' to={`/perfil-usuario/${user[0].id}`}><h4>@{user[0].user_name}</h4></Link>
                            <p className='profile-badge'>{user[0].user_badge}</p>
                        </>
                    }
                </div>
                :
                <div className="loader-spinner">
                    <ThreeDots 
                    height="30" 
                    width="30" 
                    radius="9"
                    color="#9da63d" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    />
                </div>
            }
            {error && <p>{error}</p>}
            
        </>
    );
}

export {UserHeaderProfile};