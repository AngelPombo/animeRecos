import React from 'react';
import ReactPlayer from 'react-player';

function OneEntryCard({post}) {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    if(post[2].length === 0 && !post[0][0].video_url){
        return (
            <article className='novedades-card'>
                <h4>{post[0][0].user_name}</h4>
                {post[0][0].avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                <div className='badge'>{post[0][0].user_badge}</div>
                <h3>{post[0][0].title}</h3>
                <div className='genre'>{post[0][0].genre}</div>
                <h5>{post[0][0].create_date}</h5>
                {/* {post.edited && <p>"Editado"</p>}
                {post.video_url && <div>{post.video_url}</div>} */}
                <p>{post[0][0].content}</p>
                {
                post.votes ? <p>{post.votes[0].votos_entrada}</p>
                : <p>0</p>
                }
            </article>
        )
    } else if(post[0][0].video_url){
        return(
            <article>
                <h4>{post[0][0].user_name}</h4>
                {post[0][0].avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                <div>{post[0][0].user_badge}</div>
                <h3>{post[0][0].title}</h3>
                <h5>{post[0][0].create_date}</h5>
                <p>{post[0][0].content}</p>
                <ReactPlayer url={post[0][0].video_url}/>
                {
                post.votes ? <p>{post.votes[0].votos_entrada}</p>
                : <p>0</p>
                }
                {/* {post.edited && <p>"Editado"</p>}*/}
            </article>
        )
    } else {
        return(
            <article>
                <h4>{post[0][0].user_name}</h4>
                {post[0][0].avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                <div>{post[0][0].user_badge}</div>
                <h3>{post[0][0].title}</h3>
                <h5>{post[0][0].create_date}</h5>
                <p>{post[0][0].content}</p>
                {
                post.votes ? <p>{post.votes[0].votos_entrada}</p>
                : <p>0</p>
                }
                <img 
                src={`${baseUrl}/photoentries/${post[2][0].name_photo}`} 
                alt={post[2][0].name_photo} 
                />
                {/* {post.edited && <p>"Editado"</p>}
                {post.video_url && <div>{post.video_url}</div>} */}
            </article>
        )
    }
}

export {OneEntryCard};