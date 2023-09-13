import React from 'react';
import { Link } from 'react-router-dom';

function HeaderButton({category}) {
    return (
        <Link to={`/${category}`} >
            <button className="header-btn">
                {category}
            </button>
        </Link>  
    )
}

export {HeaderButton};