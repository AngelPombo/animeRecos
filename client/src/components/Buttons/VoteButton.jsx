import React, { useContext, useState } from 'react'
import botonVotar from '/animeRecosIcono.png'
import { voteEntryService } from '../../services';
import { useParams } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';
function VoteButton() {
    const {idEntry} = useParams();
    const {logged} = useContext(sessionContext);
    const [error, setError] = useState(null);
    let idUser;
    let token;

    if(logged){
        idUser = window.localStorage.getItem("id");
        token = window.localStorage.getItem("jwt");
    }

    async function handleClick(){
        try{
            await voteEntryService(idEntry, idUser, token);
        }catch(e){
            setError(e.message);
        }
    }
    
    return (
        <>
            <button onClick={handleClick}><img src={botonVotar} alt="Votar entrada"/></button>
            {error && <p>{error}</p>}
        </>
    )
}

export {VoteButton};