import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { OpeningsCard } from '../EntriesCards/OpeningsCard/OpeningsCard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastOpeningsList.css"


function LastOpeningsList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;
    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!dataPosts){
        return(
        <section>
            <h2>Openings</h2>
            <p className='sin-entradas'>Todavía no hay entradas para mostrar, ¡Anímate y se el primero en publicar!</p>

        </section>
        )
    }


    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    
                )
                :(
                <section className='section-openings-list'> 
                    <h2>Openings</h2>
                    <ul className='openings-list'>
                    {dataPosts.slice(0,3).map((post) => {
                    return <li key={post.id}><OpeningsCard post={post}/></li>
                    })}
                    </ul>
                </section>
                )
    );
}

export {LastOpeningsList};