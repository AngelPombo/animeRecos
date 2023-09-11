import React from 'react'
import {RecosCard} from "../EntriesCards/RecosCard/RecosCard";
import {useBlog} from '../../hooks/useBlog';
import "./LastRecosList.css"



function LastRecosList({endpoint}) {

    const {data, isLoading} = useBlog(endpoint);
    

    const dataPosts = data.data;

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