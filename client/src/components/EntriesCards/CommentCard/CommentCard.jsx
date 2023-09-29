import React, { useState } from 'react';
import { EditCommentForm } from '../../EditCommentForm/EditCommentForm';
import { deleteCommentService } from '../../../services';
import { useParams } from 'react-router-dom';

function CommentCard({comment, setDataComments, dataComments}) {
    const baseUrl = import.meta.env.VITE_API_URL;
    const idUser = window.localStorage.getItem("id");
    const token = window.localStorage.getItem("jwt");
    const {idEntry} = useParams();
    const [editar, setEditar] = useState(false);
    const [deleteComment, setDeleteComment] = useState(false);
    const [error, setError] = useState(null);

    function handleClick(){
        setEditar(true);
    }

    async function handleDelete(e){
        e.preventDefault();

        try{
            const {idComment} = await deleteCommentService(idEntry, comment.comment_id, token);

            const removedDataComments = [...dataComments];

            removedDataComments.forEach((comment) => {
                if (comment.comment_id === idComment) {
                    removedDataComments.delete(comment);
                }
            });

            setDataComments(removedDataComments); 
            setDeleteComment(true);

        }catch(e){
            setError(e.message);
            setDeleteComment(false);
        }
    }

    return (
        <>
            {
                deleteComment
                ?
                <p className="comment-deleted-msg">El comentario ha sido eliminado</p>
                :
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
                                parseInt(comment.edited) === 1 && <p>Editado</p>
                            }
                            {
                                parseInt(idUser) === comment.user_id
                                &&
                                <>
                                    <button onClick={handleClick}>Editar</button>
                                    <button onClick={handleDelete}>Eliminar</button>
                                    <p>{error === null ? null : error}</p>
                                </>
                                
                            }
                            
                        </article>
                    }
                </>
            }
        </>
    )
}

export {CommentCard}