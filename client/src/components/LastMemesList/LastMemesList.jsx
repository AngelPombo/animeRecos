import React from 'react'
import {useEntries} from '../../hooks/useEntries';
import { MemesCard } from '../EntriesCards/MemesCard/MemesCard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import "./LastMemesList.css";
import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';


function LastMemesList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;

    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!isLoading && !dataPosts){
        return(
        <section >
            <h2>Memes</h2>
            <p className='sin-entradas' >Todavía no hay entradas para mostrar, ¡Anímate y se el primero en publicar!</p>

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
                <section className='section-memes-list'>
                    <Link to={'/memes/ver-todos'}>
                        <h2>Memes</h2>
                    </Link>
                    <ul className='memes-list'>
                    {dataPosts.slice(0,1).map((post) => {
                    return <li key={post.id}><MemesCard post={post}/></li>
                    })}
                    </ul>
                </section>
                )
    );
}

export {LastMemesList};