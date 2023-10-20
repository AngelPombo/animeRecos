import React from 'react';
import "./RecosCard.css";
import { CardButton } from '../../Buttons/CardButton';

function RecosCard({post}) {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    return (
        <article className='recos-card'>
            <div className='recos-card-div'>
                <header className='top-card-header'>
                    <section className='user-info'>
                        {
                            post.avatar ?
                            <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img>
                            :
                            <img className="avatar" src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post.user_name}></img>
                        }
                        <div className='username-badge-card'>
                            <h4>{post.user_name}</h4>
                            <div className='badge'>{post.user_badge}</div>
                        </div>
                    </section>
                    <h5>{new Date(post.create_date).toLocaleDateString()}</h5>
                </header>
                <div className='title-genre-card'>
                    <h3>{post.title}</h3>
                    <div className='genre'>{post.genre}</div>
                </div>
                <p className='card-content'>{post.content}</p>
                <div className='card-button-div'>
                    <p className='total-votos'>{post.votos} votos</p>
                    <CardButton id={post.id}/>
                </div>
            </div>
        </article>
    )
}
export {RecosCard};