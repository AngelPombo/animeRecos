import React from 'react'
import {useBlog} from '../../hooks/useBlog';
import { MemesCard } from '../EntriesCards/MemesCard/MemesCard';
import "./LastMemesList.css"


function LastMemesList({endpoint}) {

    const {data, isLoading} = useBlog(endpoint);
    

    const dataPosts = data.data;
//si no hay data da undefined
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