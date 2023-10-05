import React, { useContext, useState } from 'react'
import { postCommentService } from '../../services'
import { useParams } from 'react-router-dom'
import sessionContext from '../../context/sessionContext'

function CommentForm({setDataComments, dataComments}) {

    const {logged} = useContext(sessionContext);
    const {idEntry} = useParams();
    const [error, setError] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
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
            setIsLoading(true);
            if(logged){
                token = window.localStorage.getItem("jwt");
            }

            setError(null);

          infoNewComment = await postCommentService(idEntry, token, content);
            
        }catch(e){
            setError(e.message);
          
        } finally{
          setIsLoading(false);
          if(error === null){
            if(dataComments){
              const newCommentList = [... dataComments, infoNewComment[0]];
              setDataComments(newCommentList);
              e.target.commentContent.value = "";
            }else{
              setDataComments([infoNewComment[0]]);
              e.target.commentContent.value = "";
            }
          }
          
        }
    }

  return (
    <>
      {
      logged &&
      <form onSubmit={handleSubmit} className="comment-form">
        <label>
          <textarea className="comment-content-area" name="commentContent" id="commentContent" cols="100" rows="10" maxLength="5000" onChange={handleChange}></textarea>
        </label>
        {error ? <p>{error}</p> : null}
        <button className="btn-comment" type='submit'> Comentar </button>
      </form>
      }
    </>
    
    

  )
}

export {CommentForm}