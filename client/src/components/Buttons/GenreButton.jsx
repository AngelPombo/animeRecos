import React from 'react';
import { Link } from 'react-router-dom';

function GenreButton({category, genre, img}) {
    return (
        <div>
            <Link to={`/${category}/${genre}`} >
                <button className="genre-btn">
                    {genre}
                </button>
                {/* <img src={img} alt={genre} /> */}
            </Link> 
        </div>
        
    )
}

export {GenreButton};