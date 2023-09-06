import React from 'react';

function RecosCard({post}) {

    console.log("------POST en RecosCard:", post);

    return (
        <article>
            <h4>{post.user_name}</h4>
            <img src={post.avatar} alt={post.user_name}></img>
            <div>{post.user_badge}</div>
            <h3>{post.title}</h3>
            <div>{post.genre}</div>
            <h5>{post.create_date}</h5>
            {/* {post.edited && <p>"Editado"</p>}
            {post.video_url && <div>{post.video_url}</div>} */}
            <p>{post.content}</p>

        </article>
    )
}
export {RecosCard};