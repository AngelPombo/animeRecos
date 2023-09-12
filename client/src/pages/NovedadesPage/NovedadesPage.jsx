import React from 'react'
import {useBlog} from '../../hooks/useBlog';
import { NovedadesCard } from '../../components/EntriesCards/NovedadesCard/NovedadesCard'; 
import "./NovedadesPage.css"


function NovedadesPage() {

    const {data, isLoading} = useBlog("http://localhost:3001/last-entries");
    

    const dataPosts = data.data;
//si no hay data da undefined
    console.log(dataPosts)
    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    
                )
                :(
                <section className='section-novedades-page'> 
                    <ul className='novedades-page'>
                    {dataPosts.map((post) => {
                    return <li key={post.entry_id}><NovedadesCard post={post}/></li>
                    })}
                    </ul>
                </section>
               )
    );
}

export {NovedadesPage};