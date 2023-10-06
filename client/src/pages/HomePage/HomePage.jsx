import React from 'react';
import './HomePage.css';


import {LastRecosList} from '../../components/LastRecosList/LastRecosList';
import { LastMemesList } from '../../components/LastMemesList/LastMemesList';
import { LastFanartList } from '../../components/LastFanartList/LastFanartList';
import { LastCosplaysList } from '../../components/LastCosplaysList/LastCosplaysList';
import { LastOpeningsList } from '../../components/LastOpeningsList/LastOpeningsList';
import { LastTeoriasList } from '../../components/LastTeoriasList/LastTeoriasList';


function HomePage() {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    return (
        <div className="home-page">
            <section className='column1'>
                <LastMemesList endpoint={`${baseUrl}/entries/memes`}/>
                <LastFanartList endpoint={`${baseUrl}/entries/fanArt`}/>
                <LastCosplaysList endpoint={`${baseUrl}/entries/cosplays`}/>
            </section>
            <section className='column2'>
                <LastRecosList endpoint={`${baseUrl}/entries/recomendaciones`}/>
            </section>
            <section className='column3'>
                <LastOpeningsList endpoint={`${baseUrl}/entries/openings`}/>
                <LastTeoriasList endpoint={`${baseUrl}/entries/teorias`} />
            </section>
        </div>
    )
}

export {HomePage};