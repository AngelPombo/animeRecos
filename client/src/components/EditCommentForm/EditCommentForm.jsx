import React, { useContext, useState } from 'react';
import sessionContext from '../../context/sessionContext';
import { editCommentService } from '../../services';
import { useParams } from 'react-router';

function EditCommentForm ({idComment, setEditar, setDataComments, dataComments}) {

    const {logged} = useContext(sessionContext);
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const {idEntry} = useParams();

    function handleChange (e){
        const {name}= e.target
        const value = e.target.value

        if (name === 'commentContent'){
          setContent(value)
        
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
         
          infoEditedComment = await editCommentService(idEntry, idComment, content, token);
            
        }catch(e){
            setError(e.message);
        } finally{
            if(error === null){
                setEditar(false)
                const findvariable = dataComments.find((comment) => comment.comment_id === idComment)
                const indexEditedComment = dataComments.indexOf(findvariable)
                const newDataComments = [...dataComments];
                newDataComments.splice(indexEditedComment, 1, infoEditedComment.data[0])
                setDataComments(newDataComments); 
              }
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
              <textarea name="commentContent" id="commentContent" cols="30" rows="10" onChange={handleChange}></textarea>
            </label>
            {error ? <p>{error}</p> : null}
            <button type='submit'> Editar comentario </button>
    
        </form>
      )
}

export {EditCommentForm};
