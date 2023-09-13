import React from 'react'
import {TeoriasCard} from "../EntriesCards/TeoriasCard/TeoriasCard";
import {useEntries} from '../../hooks/useEntries';
import "./LastTeoriasList.css"



function LastTeoriasList({endpoint}) {

    const {data, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;

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
                    {dataPosts.slice(0,5).map((post) => {
                    return <li key={post.id}><TeoriasCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastTeoriasList};