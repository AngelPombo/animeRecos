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
                <div className='novedades-card-div'>
                    <header className='top-card-header'>
                        <section className='user-info'>
                            {post.avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post.user_name}></img> }
                            <div className='username-badge-card'>
                                <h4>{post.user_name}</h4>
                                <div className='badge'>{post.user_badge}</div>
                            </div>
                        </section>
                        <h5>{new Date(post.create_date).toLocaleDateString()}</h5>
                    </header>
                    <div className='title-genre-card'>
                        <h3>{post.title}</h3>
                        <p className='genre'>{`${post.category} - ${post.genre}`}</p>
                    </div>
                    <p className='card-content'>{post.content}</p>
                </div>
                <div className='novedades-button-div'>
                    <p className='total-votos'>{post.votos} votos</p>
                    <CardButton id={post.id}/>
                </div>
            </article>
        )
    } else if(post.video_url){
        return(
            <article className='novedades-card'>
                <div className='novedades-card-div'>
                    <header className='top-card-header'>
                        <section className='user-info'>
                            {post.avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post.user_name}></img> }
                            <div className='username-badge-card'>
                                <h4>{post.user_name}</h4>
                                <div className='badge'>{post.user_badge}</div>
                            </div>
                        </section>
                        <h5>{new Date(post.create_date).toLocaleDateString()}</h5>
                    </header>
                    <div className='title-genre-card'>
                        <h3>{post.title}</h3>
                        <p className='genre'>{`${post.category} - ${post.genre}`}</p>
                    </div>
                    <div className='content-opening-div'>
                        <p>{post.content}</p>
                        <div className='img-card openings-video-div'>
                            <ReactPlayer  width= {370} height={180}  url={post.video_url} controls={true}/>
                        </div>
                    </div>
                </div>
                <div className='novedades-button-div'>
                    <p className='total-votos'>{post.votos} votos</p>
                    <CardButton id={post.id}/>
                </div>
            </article>
        )
    } else {
        return(
            <article className='novedades-card'>
                <div className='novedades-card-div'>
                    <header className='top-card-header'>
                        <section className='user-info'>
                            {post.avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post.avatar}`} alt={post.user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post.user_name}></img> }
                            <div className='username-badge-card'>
                                <h4>{post.user_name}</h4>
                                <div className='badge'>{post.user_badge}</div>
                            </div>               
                        </section>
                        <h5>{new Date(post.create_date).toLocaleDateString()}</h5> 
                    </header>
                    <div className='title-genre-card'>
                        <h3>{post.title}</h3>
                        <p className='genre'>{`${post.category} - ${post.genre}`}</p>
                    </div>
                    <div className='content-image-div'>
                        <p>{post.content}</p>
                        <div className='novedades-div'>
                            <img className='img-card' 
                            src={`${baseUrl}/photoentries/${post.photos_info[0].photo}`} 
                            alt={post.photos_info[0].photo} 
                            />
                        </div>
                    </div>
                </div> 
                <div className='novedades-button-div'>
                    <p className='total-votos'>{post.votos} votos</p>
                    <CardButton id={post.id}/>
                </div>
            </article>
        )
    }

    
}
export {NovedadesCard};