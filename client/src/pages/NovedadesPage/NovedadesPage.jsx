import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { NovedadesCard } from '../../components/EntriesCards/NovedadesCard/NovedadesCard'; 
import "./NovedadesPage.css"


function NovedadesPage() {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    const {data, isLoading} = useEntries(`${baseUrl}/last-entries`);
    

    const dataPosts = data.data;
//si no hay data da undefined

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