import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { useParams } from 'react-router-dom';
import { NovedadesCard } from '../../components/EntriesCards/NovedadesCard/NovedadesCard';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import './FilterCategoriesByGenre.css'

function FilterCategoriesByGenre() {
    const baseUrl = import.meta.env.VITE_API_URL;
    const {category, genre} = useParams();
    const {data, error, isLoading} = useEntries(`${baseUrl}/entries/${category}/${genre}`);
    
    const dataPosts = data.data;

    if (isLoading) return <ErrorMessage message={error}/>;

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