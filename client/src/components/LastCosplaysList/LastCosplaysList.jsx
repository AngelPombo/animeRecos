import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { CosplaysCard } from '../EntriesCards/CosplaysCard/CosplaysCard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastCosplaysList.css"



function LastCosplaysList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;
    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!dataPosts){
        return(
        <section>
            <h2>Cosplays</h2>
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
