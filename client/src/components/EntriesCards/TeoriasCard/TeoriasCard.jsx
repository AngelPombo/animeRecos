import React from 'react';
import "./TeoriasCard.css"
import { CardButton } from '../../Buttons/CardButton';

function TeoriasCard({post}) {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    return (
        <article className='teorias-card'>
            <h4>{post.user_name}</h4>
            {
                post.avatar ?
                <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img>
                :
                null
            }
            <div className='badge'>{post.user_badge}</div>
            <h3>{post.title}</h3>
            <div className='genre'>{post.genre}</div>
            <h5>{post.create_date}</h5>
            <p>{post.content}</p>
            <CardButton id={post.id}/>
        </article>
    )
}
export {TeoriasCard};