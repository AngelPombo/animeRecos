import React from 'react';
import { Link } from 'react-router-dom';

function CardButton({id}) {
    return (
        <Link to={`/entrada/${id}`} >
            <button className="entry-card-btn">
                +
            </button>
        </Link>  
    )
}

export {CardButton};