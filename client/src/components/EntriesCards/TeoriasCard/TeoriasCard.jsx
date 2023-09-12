import React from 'react';
import "./TeoriasCard.css"
const baseUrl = import.meta.env.VITE_API_URL;

function TeoriasCard({post}) {


    return (
        <article className='teorias-card'>
            <h4>{post.user_name}</h4>
            <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img>
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
export {TeoriasCard};