import React from 'react';
import ReactPlayer from 'react-player';
import { CardButton } from '../../Buttons/CardButton';
import './OpeningsCard.css'

const baseUrl = import.meta.env.VITE_API_URL;

function OpeningsCard({post}) {

    return (
        <article>
            <h4>{post.user_name}</h4>
            {
                post.avatar ?
                <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img>
                :
                null
            }
            <div>{post.user_badge}</div>
            <h3>{post.title}</h3>
            <h5>{new Date(post.create_date).toDateString()}</h5>
            {
                post.video_url ?
                <ReactPlayer  width= {320} height={180} url={post.video_url}/>
                :
                null
            }
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