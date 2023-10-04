import React, { useContext, useEffect, useState } from 'react'
import botonSinPintar from '/animeRecosIconotrazo.png'
import botonPintado from '/animeRecosIcono.png'
import { voteEntryService } from '../../services';
import { useParams } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';


function VoteButton({ setVotos, liked}) {
    const {idEntry} = useParams();
    const {logged} = useContext(sessionContext);
    const [error, setError] = useState(null);
    const [votado, setVotado] = useState(liked)
 
    

    let idUser;
    let token;

    if(logged){
        idUser = window.localStorage.getItem("id");
        token = window.localStorage.getItem("jwt");
    }

    async function handleClick(){
        try{
          const newValueVote = await voteEntryService(idEntry, idUser, token);
          setVotado(newValueVote.votado)
          setVotos(newValueVote.votos_totales)
          
        }catch(e){
            setError(e.message);
        }
    }

    
    
    return (
        <>
            <button  className="like-btn" onClick={handleClick}> 

                    {
                    parseInt(votado) ===1 ? <img className='btn-image activo' src={botonPintado} alt="Borrar voto"/>
                    :
                    <img className='btn-image' src={botonSinPintar} alt="Votar entrada"/>
                    }
     
            </button>
            
            
            {error && <p>{error}</p>}
        </>
    )
}

export {VoteButton};