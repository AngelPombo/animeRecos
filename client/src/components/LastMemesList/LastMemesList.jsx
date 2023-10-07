import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { MemesCard } from '../EntriesCards/MemesCard/MemesCard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastMemesList.css"


function LastMemesList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;
 
    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!dataPosts){
        return(
        <section >
            <h2>Memes</h2>
            <p className='sin-entradas' >Todavía no hay entradas para mostrar, ¡Anímate y se el primero en publicar!</p>

        </section>
        )
    }

    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    
                )
                :(
                <section className='section-memes-list'> 
                    <h2>Memes</h2>
                    <ul className='memes-list'>
                    {dataPosts.slice(0,1).map((post) => {
                    return <li key={post.id}><MemesCard post={post}/></li>
                    })}
                    </ul>
                </section>
                )
    );
}

export {LastMemesList};