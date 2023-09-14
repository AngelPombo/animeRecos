import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { FanartCard } from '../EntriesCards/FanartCard/FanartCard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastFanartList.css"



function LastFanartList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;
    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!dataPosts){
        return(
        <section>
            <h2>Fanart</h2>
            <p>Anímate, se el primero en publicar una entrada!</p>

        </section>
        )
    }

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