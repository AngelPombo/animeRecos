import React, { useState } from 'react';
import { EditCommentForm } from '../../EditCommentForm/EditCommentForm';

function CommentCard({comment, setDataComments, dataComments}) {
    const baseUrl = import.meta.env.VITE_API_URL;

    const [editar, setEditar] = useState(false)

    function handleClick(){
        setEditar(true);
    }

    return (
        <>
            {
                editar ? <EditCommentForm idComment={comment.comment_id} setEditar={setEditar} setDataComments={setDataComments} dataComments={dataComments}/>
                :
                <article>
                    {
                        comment.avatar ?
                        <img className="avatar-comment" src={`${baseUrl}/avataruser/${comment.avatar}`} alt={comment.user_name}></img>
                        :
                        null
                    }
                    <h4>{comment.user_name}</h4>
                    <p>{comment.user_badge}</p>
                    <p>{comment.comment_date}</p>
                    <p>{comment.comment_content}</p>
                    {
                        comment.edited === 1 && <p>Editado</p>
                    } 
                    <button onClick={handleClick}>Editar</button>
                </article>
            }
        </>
    )
}

export {CommentCard}