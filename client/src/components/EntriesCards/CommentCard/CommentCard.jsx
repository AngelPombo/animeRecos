import React from 'react';

function CommentCard({comment}) {
    const baseUrl = import.meta.env.VITE_API_URL;
    return (
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
        </article>
        

    )
}

export {CommentCard}