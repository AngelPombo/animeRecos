import React, { useContext } from 'react'
import { CommentCard } from '../EntriesCards/CommentCard/CommentCard';
import { useParams } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';
import { useEntries } from '../../hooks/useEntries';

function CommentsList() {
    const {logged} = useContext(sessionContext);
    const {idEntry} = useParams();
    let token;

    if(logged){
        token=window.localStorage.getItem("jwt");
    }

    const {data, error, isLoading} = useEntries(`${import.meta.env.VITE_API_URL}/comments/${idEntry}`, token);

    const dataComments = data.data;
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
                                return <li key={comment.comment_id}><CommentCard comment={comment}/></li>
                            })
                        }
                    </ul>
                )
            }
        </section>
        
    )
}

export {CommentsList};