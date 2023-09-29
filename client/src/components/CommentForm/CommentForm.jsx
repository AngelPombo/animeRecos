import React, { useContext, useState } from 'react'
import { postCommentService } from '../../services'
import { useParams } from 'react-router-dom'
import sessionContext from '../../context/sessionContext'

function CommentForm({setDataComments, dataComments}) {

    const {logged} = useContext(sessionContext);
    const {idEntry} = useParams();
    const [error, setError] = useState(null);
    const [content, setContent] = useState("")
    
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
        let infoNewComment;
   
        try{
            if(logged){
                token = window.localStorage.getItem("jwt");
            }

         
            setError(null);
         
          infoNewComment = await postCommentService(idEntry, token, content);
            
        }catch(e){
            setError(e.message);
          
        } finally{
          if(error === null){
            const newCommentList = [... dataComments, infoNewComment[0]];
            setDataComments(newCommentList); 
          }
        }

    }

  return (
    <form onSubmit={handleSubmit}>
        <label>
          <textarea name="commentContent" id="commentContent" cols="30" rows="10" onChange={handleChange}></textarea>
        </label>
        {error ? <p>{error}</p> : null}
        <button type='submit'> comentar </button>

    </form>

  )
}

export {CommentForm}