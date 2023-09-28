import React, { useState } from 'react'
import { postCommentService } from '../../services'
import { useParams } from 'react-router-dom'

function CommentForm() {

    const {idEntry} = useParams()
    const token = window.localStorage.getItem("jwt")
    console.log(idEntry)
    const [error, setError] = useState(null)


    async function handleSubmit(e){
        e.preventDefault()
        console.log(e.target.commentContent.value)
        const comment = e.target.commentContent.value

        try {
            console.log(token)

           await postCommentService({idEntry, token, comment})
          
            
        } catch (error) {
            
            setError(error.message)
            
        }




    }







  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="commentContent"></label>
        <textarea name="commentContent" id="commentContent" cols="30" rows="10"></textarea>
        {error ? <p>{error}</p> : null}
        <button type='submit'> comentar </button>

    </form>

  )
}

export {CommentForm}