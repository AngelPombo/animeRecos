import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { NovedadesCard } from '../../components/EntriesCards/NovedadesCard/NovedadesCard'; 
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import "./NovedadesPage.css"



function NovedadesPage() {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    const {data,error, isLoading} = useEntries(`${baseUrl}/last-entries`);

    const dataPosts = data.data;

    if(error){
        return <ErrorMessage message= {error}/>
    }

    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    
                )
                :(
                    <section className='section-novedades-page'> 
                    {
                        dataPosts !== undefined ?
                        <ul className='novedades-page'>
                        {dataPosts.map((post) => {
                        return <li  key={post.id}><NovedadesCard post={post}/></li>
                        })}
                        </ul>
                        :
                        <div className='sin-entradas-by-genre-section'>
                            <h2>Novedades</h2>
                            <p>No se han encontrado publicaciones... ¡Animate a crear una entrada!</p>
                        </div>
                       
                    }
                       
                    </section>
                )
    );
}

export {NovedadesPage};