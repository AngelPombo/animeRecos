import React from 'react';
const baseUrl = import.meta.env.VITE_API_URL;

function MemesCard({post}) {

console.log(post.photos_info[0].photo)
    return (
        <article>
            <h4>{post.user_name}</h4>
            <img src={post.avatar} alt={post.user_name}></img>
            <div>{post.user_badge}</div>
            <h3>{post.title}</h3>
            <h5>{post.create_date}</h5>
            <img 
            src={`http://localhost:3001/src/uploads/photoentries/${post.photos_info[0].photo}`} 
            alt={post.photos_info[0].photo} 
            />
            {/* {post.edited && <p>"Editado"</p>}
            {post.video_url && <div>{post.video_url}</div>} */}
           

        </article>
    )
}
export {MemesCard};

