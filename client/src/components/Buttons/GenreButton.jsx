import React from 'react';
import "./GenreButton.css";


function GenreButton({category, genre, setViewGenre}) {

    function handleGenre(e){
        const targetBtn = e.target.name
        setViewGenre(targetBtn)
    }

    return (
        <>
            <button name={genre} onClick={handleGenre} className={`genre-btn ${category}-genre-btn ${genre}-img-btn`}>
                    {genre}
            </button>
        </> 
    )
}

export {GenreButton};