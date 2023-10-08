import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { NovedadesCard } from '../../components/EntriesCards/NovedadesCard/NovedadesCard'; 
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import "./NovedadesPage.css";
import { ThreeDots } from "react-loader-spinner";



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
                    <div className="loader-spinner">
                        <ThreeDots 
                        height="30" 
                        width="30" 
                        radius="9"
                        color="#9da63d" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                        />
                    </div>
                    
                )
                :(
                    <section className='section-novedades-page'>
                        <h2>Novedades</h2>
                        {
                            dataPosts !== undefined ?
                            <ul className='novedades-page'>
                            {dataPosts.map((post) => {
                            return <li  key={post.id}><NovedadesCard post={post}/></li>
                            })}
                            </ul>
                            :
                            <div className='sin-entradas-by-genre-section'>
                                <p>No se han encontrado publicaciones... ¡Animate a crear una entrada!</p>
                            </div>
                        }
                    </section>
                )
    );
}

export {NovedadesPage};