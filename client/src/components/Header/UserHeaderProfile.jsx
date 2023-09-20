import React, { useContext, useEffect, useState } from 'react';
import { getUserInfoService } from '../../services';
import sessionContext from '../../context/sessionContext';

function UserHeaderProfile () {

    const baseUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(true);
    
    const {userId} = useContext(sessionContext);

    const [dataUser, setDataUser] = useState([]);
    
    useEffect(() => {
        async function userProfileInfo() {
                
            const auth = window.localStorage.getItem("jwt");

            try{
                setLoading(true)
                let userInfo = await getUserInfoService(userId, auth);
                setDataUser(userInfo);
        
            } catch(e){ 
                console.log(e.message);
            } finally{
                setLoading(false)
            }

        }
        userProfileInfo();
    }, [])

    if(dataUser.length === 0) return <p>No es posible acceder a la información del usuario. Debes iniciar sesión.</p>
    if(loading) return <p>Cargando...</p>;

    return (
        <>
            <img src={`${baseUrl}/avataruser/${dataUser[0].avatar}`} alt={dataUser[0].user_name} />
            <h4>@{dataUser[0].user_name}</h4>
            <p>{dataUser[0].user_badge}</p>
        </>
    );
}

export {UserHeaderProfile};