import React from 'react'
import {TeoriasCard} from "../EntriesCards/TeoriasCard/TeoriasCard";
import {useEntries} from '../../hooks/useEntries';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import "./LastTeoriasList.css"



function LastTeoriasList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;

    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!dataPosts){
        return(
        <section>
            <h2>Teorías</h2>
            <p className='sin-entradas'>Todavía no hay entradas para mostrar, ¡Anímate y se el primero en publicar!</p>

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
                <section className='section-teorias-list'>
                    <h2>Teorias</h2>
                    <ul className='recos-list'>
                    {dataPosts.slice(0,6).map((post) => {
                    return <li key={post.id}><TeoriasCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastTeoriasList};