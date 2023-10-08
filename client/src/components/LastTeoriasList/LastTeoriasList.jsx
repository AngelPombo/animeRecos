import React from 'react'
import {TeoriasCard} from "../EntriesCards/TeoriasCard/TeoriasCard";
import {useEntries} from '../../hooks/useEntries';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import "./LastTeoriasList.css";
import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';



function LastTeoriasList({endpoint}) {

    const {data, error, isLoading} = useEntries(endpoint);
    

    const dataPosts = data.data;

    if(error){
        return <ErrorMessage message= {error}/>
    }
    if(!isLoading && !dataPosts){
        return(
        <section>
            <h2>Teorías</h2>
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
                <section className='section-teorias-list'>
                    <Link to={'/teorias/ver-todos'}>
                        <h2>Teorias</h2>
                    </Link>
                    <ul className='recos-list'>
                    {dataPosts.slice(0,6).map((post) => {
                    return <li key={post.id}><TeoriasCard post={post}/></li>
                    })}
                    </ul>
                </section>)
    );
}

export {LastTeoriasList};