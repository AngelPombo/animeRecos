import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useEntries } from '../../hooks/useEntries';
import { NovedadesCard } from '../EntriesCards/NovedadesCard/NovedadesCard';


function UserProfile ({user}) {

    const baseUrl = import.meta.env.VITE_API_URL;

    const {id} = useParams();

    const token = window.localStorage.getItem("jwt")

    const {data, error, isLoading} = useEntries(`${baseUrl}/user-entries/${id}`, token)

    const dataPosts = data.data;

    if(error){
        return <ErrorMessage message= {error} />
    }

    return (
        <article className='user-profile'>
            <h3>{user[0].user_name}</h3>
            <p>{user[0].user_badge}</p>
            <img src={`${baseUrl}/avataruser/${user[0].avatar}`} alt={user[0].user_name} />
            <p>Miembro desde: {user[0].created_date}</p>
            <h4>Biografía</h4>
            <p>{user[0].biography}</p>
            {
                user[0].link_twitter ?
                <a href={user[0].link_twitter} target='_blank'><img src='https://graffica.ams3.digitaloceanspaces.com/2023/07/rQYXqS5v-F1ySdm9WYAIbjHo-1024x1024.jpeg' alt='Link twitter' className='logo-link'/></a>
                :
                null
            }
            {
                user[0].link_youtube ?
                <a href={user[0].link_youtube} target='_blank'><img src='https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png' className='logo-link' alt='Link Youtube'/></a>
                :
                null
            }
            {
                user[0].link_ttv ?
                <a href={user[0].link_ttv} target='_blank'><img src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c540.png' className='logo-link' alt='Link Twitch'/></a>
                :
                null
            }
            {
                user[0].link_insta ?
                <a href={user[0].link_insta} target='_blank'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png' alt='Link Instagram' className='logo-link'/></a>
                :
                null
            }
            <h4>Últimas publicaciones</h4>
            {
                isLoading ?
                (
                    <div>Cargando...</div>
                )
                :(
                    <section className='section-entradas-perfil'>
                        <ul className='lista-entradas-perfil'>
                        {dataPosts.map((post) => {
                        return <li key={post.id}><NovedadesCard post={post}/></li>
                        })}
                        </ul>
                    </section>
                )
            }
        </article>
    );
}

export {UserProfile};
