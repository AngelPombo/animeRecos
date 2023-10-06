import React, { useContext, useState } from 'react';
import sessionContext from '../../context/sessionContext';
import { editCommentService } from '../../services';
import { useParams } from 'react-router';
import "./EditCommentForm.css";

function EditCommentForm ({idComment, setEditar, setDataComments, dataComments, contentEdit, setContentEdit}) {

    const {logged} = useContext(sessionContext);
    const [error, setError] = useState(null);
    const {idEntry} = useParams();

    function handleChange (e){
        const {name}= e.target
        const value = e.target.value

        if (name === 'commentContent'){
          setContentEdit(value)
        
      }
    }

    async function handleSubmit(e){
        e.preventDefault()
        
        let token;
        let infoEditedComment;

        try{
            if(logged){
                token = window.localStorage.getItem("jwt");
            }

            setError(null);

          infoEditedComment = await editCommentService(idEntry, idComment, contentEdit, token);
            
        }catch(e){
            setError(e.message);
        } finally{
            if(error === null){
                setEditar(false)
                const findvariable = dataComments.find((comment) => comment.comment_id === idComment);
                const indexEditedComment = dataComments.indexOf(findvariable);
                const newDataComments = [...dataComments];
                newDataComments.splice(indexEditedComment, 1, infoEditedComment.data[0]);
                setDataComments(newDataComments); 
              }
        }
    }


    return (
        <form onSubmit={handleSubmit} className="edit-comment-form">
            <label className="edit-comment-label">
              <textarea className="edit-comment-textarea" name="commentContent" id="commentContent" cols="50" rows="5" maxLength="5000" onChange={handleChange} defaultValue={contentEdit}></textarea>
            </label>
            {error ? <p>{error}</p> : null}
            <button className="edit-comment-button" type='submit'> Publicar </button>
    
        </form>
      )
}

export {EditCommentForm};
