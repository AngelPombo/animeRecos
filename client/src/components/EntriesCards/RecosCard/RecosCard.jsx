import React from 'react';
import "./RecosCard.css"

function RecosCard({post}) {


    return (
        <article className='recos-card'>
            <h4>{post.user_name}</h4>
            <img src={post.avatar} alt={post.user_name}></img>
            <div className='badge'>{post.user_badge}</div>
            <h3>{post.title}</h3>
            <div className='genre'>{post.genre}</div>
            <h5>{post.create_date}</h5>
            {/* {post.edited && <p>"Editado"</p>}
            {post.video_url && <div>{post.video_url}</div>} */}
            <p>{post.content}</p>

        </article>
    )
}
export {RecosCard};