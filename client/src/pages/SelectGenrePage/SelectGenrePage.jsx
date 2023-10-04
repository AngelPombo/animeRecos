import React from 'react'
import {GenreButton} from "../../components/Buttons/GenreButton"
import "./SelectGenrePage.css"


function SelectGenrePage({category}) {

    const genres = ['accion','aventura','deportes','comedia','drama','fantasia','musical','romance','ciencia-ficcion','sobrenatural','thriller','terror','psicologico','infantil','otros'];

    return (
        <section className="select-genre-page">
            <ul className="btns-genre-list">
                {genres.map((genre) => {
                    return  <li key={genre}><GenreButton category={category} genre={genre}/></li>
                })}
                
            </ul>
        </section>
    );
}

export {SelectGenrePage};