import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { useParams } from 'react-router-dom';
import { NovedadesCard } from '../../components/EntriesCards/NovedadesCard/NovedadesCard';
import './FilterCategoriesByGenre.css';
import { ThreeDots } from "react-loader-spinner";
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

function FilterCategoriesByGenre() {
    const baseUrl = import.meta.env.VITE_API_URL;
    const {category, genre} = useParams();
    const {data, error, isLoading} = useEntries(`${baseUrl}/entries/${category}/${genre}`);
    
    const dataPosts = data.data;

    if (isLoading){
        return <div className="loader-spinner">
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
    }

    if(error) return <ErrorMessage message={error}/>

    if( dataPosts.length === 0){
        return(
        <section className='sin-entradas-by-genre-section'>
            <h2>{category.toUpperCase()}</h2>
            <h3>{genre.toUpperCase()}</h3>
            <p>Todavía no hay entradas para mostrar, ¡Anímate y se el primero en publicar!</p>

        </section>
        )
    }

    return (
            <section className='section-filter'>
                {
                    dataPosts ?
                    <ul className='list-filter'>
                        {dataPosts.map((post) => {
                            return <li key={post.id}>
                                <NovedadesCard post={post}/>
                            </li>
                        })}
                    </ul>
                    :
                    <>
                        <h2>{category.toUpperCase()}</h2>
                        <h3>{genre.toUpperCase()}</h3>
                        <p>Todavía no hay entradas para mostrar, ¡Anímate y se el primero en publicar!</p>
                    </>
                }
            </section>
    )
}

export {FilterCategoriesByGenre};