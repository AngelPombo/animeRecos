import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { CosplaysCard } from '../EntriesCards/CosplaysCard/CosplaysCard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastCosplaysList.css";
import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';



function LastCosplaysList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;
    if(error){
        return <ErrorMessage message= {error}/>
    }

    if(!isLoading && !dataPosts){
        return(
            <section>
                <h2>Cosplays</h2>
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
                <section className='section-cosplays-list'>
                    <Link to={'/cosplays'}>
                        <h2>Cosplays</h2>
                    </Link>
                    <ul className='cosplays-list'>
                    {dataPosts.slice(0,3).map((post) => {
                    return <li key={post.id}><CosplaysCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastCosplaysList};
