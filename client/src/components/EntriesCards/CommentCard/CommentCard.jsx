import React, { useEffect, useState } from 'react';
import { EditCommentForm } from '../../EditCommentForm/EditCommentForm';
import { deleteCommentService } from '../../../services';
import { useParams } from 'react-router-dom';
import "./CommentCard.css";

function CommentCard({comment, setDataComments, dataComments}) {
    const baseUrl = import.meta.env.VITE_API_URL;
    const idUser = window.localStorage.getItem("id");
    const token = window.localStorage.getItem("jwt");
    const {idEntry} = useParams();
    const [editar, setEditar] = useState(false);
    const [deleteComment, setDeleteComment] = useState(false);
    const [error, setError] = useState(null);
    const [contentEdit, setContentEdit] = useState(comment.content);
    let removedDataComments;

    function handleClick(){
        setEditar(true);
    }

    async function handleDelete(e){
        e.preventDefault();

        try{
            const {idComment} = await deleteCommentService(idEntry, comment.comment_id, token);

            removedDataComments = [...dataComments];

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
                        editar ? <EditCommentForm idComment={comment.comment_id} setEditar={setEditar} setDataComments={setDataComments} dataComments={dataComments} contentEdit={contentEdit} setContentEdit={setContentEdit}/>
                        :
                        <article className="comment-card">
                            <header className="comment-card-header">
                                <div className="user-info-comment-div">
                                    {
                                        comment.avatar ?
                                        <img className="avatar-comment" src={`${baseUrl}/avataruser/${comment.avatar}`} alt={comment.user_name}></img>
                                        :
                                        <img className="avatar-comment" src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={comment.user_name}></img>
                                    }
                                    <div className="username-badge-card">
                                        <h4>{comment.user_name}</h4>
                                        <div className='user-badge-comment'>{comment.user_badge}</div>
                                    </div>
                                </div>
                                <p>{new Date(comment.comment_date).toLocaleDateString()}</p>
                            </header>
                            <p className="comment-content-p">{comment.comment_content}</p>
                            <footer className="comment-card-footer">
                                {
                                    parseInt(idUser) === comment.user_id
                                    &&
                                    <>
                                        <div className="comment-card-footer-div">
                                            <button className="btn-comment-editar" onClick={handleClick}>Editar</button>
                                            <button className="btn-comment-borrar" onClick={handleDelete}>Eliminar</button>
                                        </div>
                                        <p>{error === null ? null : error}</p>
                                    </>
                                    
                                }
                                {
                                    parseInt(comment.edited) === 1 && <p className="edited-comment">Editado</p>
                                }
                            </footer>
                        </article>
                    }
                </>
            }
        </>
    )
}

export {CommentCard}