import React from 'react'
import {useBlog} from '../../hooks/useBlog';
import { OpeningsCard } from '../EntriesCards/OpeningsCard/OpeningsCard';
import "./LastOpeningsList.css"


function LastOpeningsList({endpoint}) {

    const {data, isLoading} = useBlog(endpoint);
    

    const dataPosts = data.data;
//si no hay data da undefined
    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    
                )
                :(
                <section className='section-openings-list'> 
                    <h2>Openings</h2>
                    <ul className='openings-list'>
                    {dataPosts.slice(0,2).map((post) => {
                    return <li key={post.id}><OpeningsCard post={post}/></li>
                    })}
                    </ul>
                </section>
               )
    );
}

export {LastOpeningsList};