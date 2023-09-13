import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { CosplaysCard } from '../EntriesCards/CosplaysCard/CosplaysCard';
import "./LastCosplaysList.css"



function LastCosplaysList({endpoint}) {

    const {data, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;
//si no hay data da undefined
    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    
                )
                :(
                <section className='section-cosplays-list'>
                    <h2>Cosplays</h2>
                    <ul className='cosplays-list'>
                    {dataPosts.slice(0,3).map((post) => {
                    return <li key={post.id}><CosplaysCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastCosplaysList};
