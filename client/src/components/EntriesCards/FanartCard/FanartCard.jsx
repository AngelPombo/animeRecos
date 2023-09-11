import React from 'react';
const baseUrl = import.meta.env.VITE_API_URL;

function FanartCard({post}) {


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
            {/* {post.edited && <p>"Editado"</p>}
            {post.video_url && <div>{post.video_url}</div>} */}
           

        </article>
    )
}
export {FanartCard};