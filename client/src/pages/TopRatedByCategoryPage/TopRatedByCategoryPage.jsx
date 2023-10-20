import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { ThreeDots } from "react-loader-spinner";
import { NovedadesCard } from '../../components/EntriesCards/NovedadesCard/NovedadesCard';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { useParams } from 'react-router-dom';
import './TopRatedByCategoryPage.css';


function TopRatedByCategoryPage() {
    const baseUrl = import.meta.env.VITE_API_URL;
    const {category} = useParams();

    const {data,error, isLoading} = useEntries(`${baseUrl}/top-rated/${category}`);

    const dataPosts = data.data;
    console.log(category)
 
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
                        <h2 className="title-page-category">{category}</h2>
                        {
                            dataPosts !== undefined ?
                            <ul className='novedades-page'>
                            {dataPosts.map((post) => {
                            return <li  key={post.id_entry}><NovedadesCard post={post}/></li>
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

export {TopRatedByCategoryPage}

