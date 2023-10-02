import React from 'react';
import { CardButton } from '../../Buttons/CardButton';

function CosplaysCard({post}) {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

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
            <h5>{new Date(post.create_date).toLocaleDateString()}</h5>
            {
                post.photos_info ? 
                (
                    <img 
                        src={`${baseUrl}/photoentries/${post.photos_info[0].photo}`} 
                        alt={post.photos_info[0].photo} 
                    />
                )
                :
                (
                    null
                )
            }
            <CardButton id={post.id}/>

        </article>
    )
}
export {CosplaysCard};