import React from 'react';
import { CardButton } from '../../Buttons/CardButton';
import "./FanartCard.css"

function FanartCard({post}) {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    return (
        <article className='fanart-card'>
            <div className='fanart-card-div'>
                <header className='top-card-header'>
                    <section className='user-info'>
                        {
                            post.avatar ?
                            <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img>
                            :
                            null
                        }
                        <div className='username-badge-card'>
                            <h4>{post.user_name}</h4>
                            <div className='badge'>{post.user_badge}</div>
                        </div>
                    </section>
                    <h5>{new Date(post.create_date).toLocaleDateString()}</h5>
                </header>
                <h3 className='title-card'>{post.title}</h3>
                <div className='fanart-img-div'>
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
                </div>
                <div className='card-button-div'>
                    <CardButton id={post.id}/>
                </div>      
            </div>
        </article>
    )
}
export {FanartCard};