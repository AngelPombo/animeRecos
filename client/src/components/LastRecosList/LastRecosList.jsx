import React from 'react'
import {RecosCard} from "../EntriesCards/RecosCard/RecosCard";
import {useEntries} from '../../hooks/useEntries';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastRecosList.css";
import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';



function LastRecosList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;

    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!isLoading && !dataPosts){
        return(
        <section>
            <h2>Recos</h2>
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
                <section className='section-recos-list'>
                    <Link to={'/recomendaciones/ver-todos'}>
                        <h2>Recos</h2>
                    </Link>
                    <ul className='recos-list'>
                    {dataPosts.slice(0,12).map((post) => {
                    return <li key={post.id}><RecosCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastRecosList};