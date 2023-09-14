import React from 'react'
import {RecosCard} from "../EntriesCards/RecosCard/RecosCard";
import {useEntries} from '../../hooks/useEntries';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastRecosList.css"



function LastRecosList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;

    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!dataPosts){
        return(
        <section>
            <h2>Recos</h2>
            <p>Anímate, se el primero en publicar una entrada!</p>

        </section>
        )
    }

    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    //el problema es que queremos pintar antes de que lleguen los datos
                )
                :(
                <section className='section-recos-list'>
                    <h2>Recos</h2>
                    <ul className='recos-list'>
                    {dataPosts.slice(0,10).map((post) => {
                    return <li key={post.id}><RecosCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastRecosList};