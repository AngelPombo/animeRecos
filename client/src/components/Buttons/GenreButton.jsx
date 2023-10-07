import React from 'react';
import { Link } from 'react-router-dom';
import "./GenreButton.css";


function GenreButton({category, genre, img}) {
    return (
        <>
            <Link to={`/${category}/${genre}`} >
                <button className={`genre-btn ${category}-genre-btn ${genre}-img-btn`}>
                    {genre}
                </button>
            </Link> 
        </>
        
    )
}

export {GenreButton};