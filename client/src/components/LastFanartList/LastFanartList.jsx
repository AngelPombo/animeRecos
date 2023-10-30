import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { FanartCard } from '../EntriesCards/FanartCard/FanartCard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastFanartList.css";
import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';



function LastFanartList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;
    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!isLoading && !dataPosts){
        return(
        <section>
            <h2>Fanart</h2>
            <p className='sin-entradas'>Todavía no hay entradas para mostrar, ¡Anímate y se el primero en publicar!</p>

        </section>
        )
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
                <section className='section-fanart-list'>
                    <Link to={'/fanart'}>
                        <h2>FanArts</h2>
                    </Link>
                    <ul className='fanart-list'>
                    {dataPosts.slice(0,3).map((post) => {
                    return <li key={post.id}><FanartCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastFanartList};