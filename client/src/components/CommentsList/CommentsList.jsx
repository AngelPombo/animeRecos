import React from 'react';
import { CommentCard } from '../EntriesCards/CommentCard/CommentCard';
import "./CommentList.css";


function CommentsList({error, isLoading, dataComments, setDataComments}) {
    
    if(error){
        return <ErrorMessage message= {error}/>
    }

    if(!dataComments){
        return(
            <p className="sin-comentarios">¡Todavía no hay comentarios en esta publicación!</p>
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
                    <ul className="comments-list" id="comments-list-id">
                        {
                            dataComments.map((comment) => {
                                return <li className="li-comment-card" key={comment.comment_id}><CommentCard comment={comment} setDataComments={setDataComments} dataComments={dataComments}/></li>
                            })
                        }
                    </ul>
                )
            }
        </section>
        
    )
}

export {CommentsList};