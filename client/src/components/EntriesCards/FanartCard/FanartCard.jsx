import React from 'react';
import { CardButton } from '../../Buttons/CardButton';

function FanartCard({post}) {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    return (
        <article>
            <h4>{post.user_name}</h4>
            <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img>
            <div>{post.user_badge}</div>
            <h3>{post.title}</h3>
            <h5>{new Date(post.create_date).toLocaleDateString()}</h5>
            <img 
            src={`${baseUrl}/photoentries/${post.photos_info[0].photo}`} 
            alt={post.photos_info[0].photo} 
            />
            {
                post.votes ? <p>{post.votes[0].votos_entrada}</p>
                : <p>0</p>
            }
            {/* {post.edited && <p>"Editado"</p>}
            {post.video_url && <div>{post.video_url}</div>} */}
            <CardButton id={post.id}/>

        </article>
    )
}
export {FanartCard};