import React from 'react';
import "./NovedadesCard.css"
import ReactPlayer from 'react-player';
import { CardButton } from '../../Buttons/CardButton';

function NovedadesCard({post}) {

    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    if(!post.photos_info && !post.video_url){
        return (
            <article className='novedades-card'>
                <h4>{post.user_name}</h4>
                {post.avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post.user_name}></img> }
                <div className='badge'>{post.user_badge}</div>
                <h3>{post.title}</h3>
                <div className='genre'>{post.genre}</div>
                <h5>{post.create_date}</h5>
                {/* {post.edited && <p>"Editado"</p>}
                {post.video_url && <div>{post.video_url}</div>} */}
                <p>{post.content}</p>
                <CardButton id={post.entry_id}/>
            </article>
        )
    } else if(post.video_url){
        return(
            <article>
                <h4>{post.user_name}</h4>
                {post.avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post.user_name}></img> }
                <div>{post.user_badge}</div>
                <h3>{post.title}</h3>
                <h5>{new Date(post.create_date).toDateString()}</h5>
                <p>{post.content}</p>
                <ReactPlayer url={post.video_url}/>
                {/* {post.edited && <p>"Editado"</p>}*/}
                <CardButton id={post.entry_id}/>
            </article>
        )
    } else {
        return(
            <article>
                <h4>{post.user_name}</h4>
                {post.avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post.user_name}></img> }
                <div>{post.user_badge}</div>
                <h3>{post.title}</h3>
                <h5>{new Date(post.create_date).toDateString()}</h5>
                <p>{post.content}</p>
                <img 
                src={`${baseUrl}/photoentries/${post.photos_info[0].photo}`} 
                alt={post.photos_info[0].photo} 
                />
                {/* {post.edited && <p>"Editado"</p>}
                {post.video_url && <div>{post.video_url}</div>} */}
                <CardButton id={post.entry_id}/>
            </article>
        )
    }

    
}
export {NovedadesCard};