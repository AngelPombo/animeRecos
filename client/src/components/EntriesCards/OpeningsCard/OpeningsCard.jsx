import React from 'react';
import ReactPlayer from 'react-player';
import { CardButton } from '../../Buttons/CardButton';

const baseUrl = import.meta.env.VITE_API_URL;

function OpeningsCard({post}) {

    return (
        <article>
            <h4>{post.user_name}</h4>
            <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img>
            <div>{post.user_badge}</div>
            <h3>{post.title}</h3>
            <h5>{new Date(post.create_date).toDateString()}</h5>
            <ReactPlayer url={post.video_url}/>
            {
                post.votes ? <p>{post.votes[0].votos_entrada}</p>
                : <p>0</p>
            }
            {/* {post.edited && <p>"Editado"</p>}*/}
            <CardButton id={post.id}/>
        </article>
    )
}
export {OpeningsCard};