import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { useParams } from 'react-router-dom';
import { NovedadesCard } from '../../components/EntriesCards/NovedadesCard/NovedadesCard';


function FilterCategoriesByGenre() {
    const baseUrl = import.meta.env.VITE_API_URL;
    const {category, genre} = useParams();
    const {data, isLoading} = useEntries(`${baseUrl}/entries/${category}/${genre}`);
    
    const dataPosts = data.data;

    if (isLoading) return <p>Cargando...</p>;

    return (
        <section>
            <ul>
                {dataPosts.map((post) => {
                    return <li key={post.id}>
                        <NovedadesCard post={post}/>
                    </li>
                })}
            </ul>
        </section>
    )
}

export {FilterCategoriesByGenre};