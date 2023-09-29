import React, { useContext, useEffect, useState } from 'react'
import { CommentCard } from '../EntriesCards/CommentCard/CommentCard';
import { useParams } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';
import { useEntries } from '../../hooks/useEntries';

function CommentsList({error, isLoading, dataComments, setDataComments}) {
    
    if(error){
        return <ErrorMessage message= {error}/>
    }

    if(!dataComments){
        return(
            <p>¡Todavía no hay comentarios en esta publicación!</p>
        )
    }

    return (
        <section className="section-comments-list">
            {
                isLoading ?
                (
                    <div>Cargando...</div>
                )
                :
                (
                    <ul className="comments-list">
                        {
                            dataComments.map((comment) => {
                                return <li key={comment.comment_id}><CommentCard comment={comment} setDataComments={setDataComments} dataComments={dataComments}/></li>
                            })
                        }
                    </ul>
                )
            }
        </section>
        
    )
}

export {CommentsList};