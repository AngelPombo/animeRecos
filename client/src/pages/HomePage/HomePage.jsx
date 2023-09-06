import React from 'react';
import './HomePage.css';
import { useBlog } from "../../hooks/useBlog";

import {LastPostList} from '../../components/LastPostsList/LastPostList';

function HomePage() {

    const {data, isLoading} = useBlog("http://localhost:3001/entries/recomendaciones");

    const dataPosts = data.data;

    return (
        <main className="home-page">
            {/* <div endpoint={`${url}fanart`}>3 últimos fanArts</div> */}
            {
                isLoading ? 
                (
                    <div>Cargando...</div>
                    //el problema es que queremos pintar antes de que lleguen los datos
                )
                :
                (
                    <LastPostList data={dataPosts}/>
                )
            }
            
            {/* <div endpoint={`${url}memes`}>meme destacado</div>
            <div endpoint={`${url}openings`}>2 openings</div>
            <div endpoint={`${url}teorias`}>2 teorías</div>
            <div endpoint={`${url}cosplay`}>cosplay destacado</div> */}
        </main>
    )
}

export {HomePage};