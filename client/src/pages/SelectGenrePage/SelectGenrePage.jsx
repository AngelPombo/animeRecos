import React from 'react'
import {GenreButton} from "../../components/Buttons/GenreButton"
import "./SelectGenrePage.css"
import { Link } from 'react-router-dom';


function SelectGenrePage({category}) {

    const genres = ['accion','aventura','deportes','comedia','drama','fantasia','musical','romance','ciencia-ficcion','sobrenatural','thriller','terror','psicologico','infantil'];

    return (
        <section className="select-genre-page">
            <h2>{category}</h2>
            <ul className="btns-genre-list">
                <Link to={`/${category}/ver-todos`}>
                    <li><button className="genre-btn genre-btn-all">todos</button></li>
                </Link>
                <Link to={`/${category}/mas-votados`}>
                    <li><button className='genre-btn genre-btn-top'>mas votados</button></li>
                </Link>
                {genres.map((genre) => {
                    return  <li key={genre}><GenreButton category={category} genre={genre}/></li>
                })}
            </ul>
        </section>
    );
}

export {SelectGenrePage};