import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { FanartCard } from '../EntriesCards/FanartCard/FanartCard';
import "./LastFanartList.css"



function LastFanartList({endpoint}) {

    const {data, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;
//si no hay data da undefined
    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    
                )
                :(
                <section className='section-fanart-list'>
                    <h2>FanArts</h2>
                    <ul className='fanart-list'>
                    {dataPosts.slice(0,3).map((post) => {
                    return <li key={post.id}><FanartCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastFanartList};