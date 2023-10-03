import React from 'react';
import ReactPlayer from 'react-player';
import { CardButton } from '../../Buttons/CardButton';
import './OpeningsCard.css'

const baseUrl = import.meta.env.VITE_API_URL;

function OpeningsCard({post}) {

    return (
        <article className='openings-card'>
            <div className='openings-card-div'>
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
                <div className='openings-video-div'>
                    {
                        post.video_url ?
                        <ReactPlayer width= {370} height={180} url={post.video_url}/>
                        :
                        null
                    }
                </div>
                <div className='card-button-div'>
                    <CardButton id={post.id}/>
                </div>
            </div>
        </article>
    )
}
export {OpeningsCard};