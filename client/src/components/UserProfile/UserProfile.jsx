import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useEntries } from '../../hooks/useEntries';
import { NovedadesCard } from '../EntriesCards/NovedadesCard/NovedadesCard';
import "./UserProfile.css";
import imgTwitterLogo from "/twitterSvgIcon.svg";
import imgYoutubeLogo from "/youtubeSvgIcon.svg";
import imgTwitchLogo from "/ttvSvgIcon.svg";
import imgInstagramLogo from "/instaSvgIcon.svg";
import { ThreeDots } from "react-loader-spinner";


function UserProfile ({user}) {

    const baseUrl = import.meta.env.VITE_API_URL;

    const {id} = useParams();

    const currentId = window.localStorage.getItem("id");

    const token = window.localStorage.getItem("jwt")

    const {data, error, isLoading} = useEntries(`${baseUrl}/user-entries/${id}`, token)

    const dataPosts = data.data;

    const navigateTo = useNavigate();

    if(error){
        return <ErrorMessage message= {error} />
    }

    function handleEditProfile (){
        navigateTo(`/editar-perfil/${id}`);
    }

    function handleDeleteUser(){
        navigateTo(`/users/${id}`);
    }

    return (
        <article className='user-profile'>
            <header className='user-profile-header'>
                <div className='user-profile-body'>
                    <div className='user-profile-info-btns'>
                        {
                            user[0].avatar ? <img className='user-avatar' src={`${baseUrl}/avataruser/${user[0].avatar}`} alt={user[0].user_name} />
                            :
                            <img className='user-avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={user[0].user_name}></img>
                        }
                        
                        <h2>{user[0].user_name}</h2>
                        <p>{user[0].user_badge}</p>
                        {
                        currentId === id
                        ?
                            <div className='user-profile-btn-div'>
                                <button className='user-profile-btn' onClick={handleEditProfile}>Editar perfil</button>
                                <button className='user-profile-btn' onClick={handleDeleteUser}>Eliminar cuenta</button>
                            </div>
                        :
                        null
                        }
                    </div>
                    <section className='user-rrss-section'>
                        {
                            user[0].link_twitter ?
                            <a href={user[0].link_twitter.includes("https://")? user[0].link_twitter :`https://${user[0].link_twitter}`} target='_blank'><img src={imgTwitterLogo} alt='Link twitter' className='logo-link'/></a>
                            :
                            null
                        }
                        {
                            user[0].link_youtube ?
                            <a href={user[0].link_youtube.includes("https://")? user[0].link_youtube :`https://${user[0].link_youtube}`}  target='_blank'><img src={imgYoutubeLogo} className='logo-link' alt='Link Youtube'/></a>
                            :
                            null
                        }
                        {
                            user[0].link_ttv ?
                            <a href={user[0].link_ttv.includes("https://")? user[0].link_ttv :`https://${user[0].link_ttv}`} target='_blank'><img src={imgTwitchLogo} className='logo-link' alt='Link Twitch'/></a>
                            :
                            null
                        }
                        {
                            user[0].link_insta ?
                            <a href={user[0].link_insta.includes("https://")? user[0].link_insta :`https://${user[0].link_insta}`} target='_blank'><img src={imgInstagramLogo} alt='Link Instagram' className='logo-link'/></a>
                            :
                            null
                        }
                    </section>
                </div>
                <section className='user-bio-section'>
                    <div className='user-bio-header'>
                        <h3>Biografía</h3>
                        <p>Miembro desde {new Date(user[0].created_date).toLocaleDateString()}</p>
                    </div>
                    <p className='user-bio-bio'>{user[0].biography}</p>
                </section>  
            </header>
            <section className='user-profile-section'>
                <h3>Publicaciones</h3>
                <div className='user-profile-section-div'>       
                    {
                        isLoading ?
                        (
                            <div className="loader-spinner">
                                <ThreeDots 
                                height="50" 
                                width="50" 
                                radius="9"
                                color="#9da63d" 
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                                />
                            </div>
                        )
                        :(
                            <section className='section-entradas-perfil'>
                                {
                                    dataPosts
                                    ?
                                    <ul className='lista-entradas-perfil'>
                                    {dataPosts.map((post) => {
                                    return <li key={post.id}><NovedadesCard post={post}/></li>
                                    })}
                                    </ul>
                                    :
                                    <p>¡Todavía no hay publicaciones!</p>
                                }
                            </section>
                        )
                    }
                </div>
            </section>
        </article>
    );
}

export {UserProfile};
