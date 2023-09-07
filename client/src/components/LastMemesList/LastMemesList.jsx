import React from 'react'
import {RecosCard} from "../EntriesCards/RecosCard/RecosCard";
import {useBlog} from '../../hooks/useBlog';
import { MemesCard } from '../EntriesCards/MemesCard/MemesCard';



function LastMemesList({endpoint}) {

    const {data, isLoading} = useBlog(endpoint);
    

    const dataPosts = data.data;
//si no hay data da undefined
    return (
        isLoading ? 
                (
                    <div>Cargando...</div>
                    
                )
                :(
                <ul>
                {dataPosts.slice(0,1).map((post) => {
                return <li key={post.id}><MemesCard post={post}/></li>
                })}
                </ul>)
    );
}

export {LastMemesList};