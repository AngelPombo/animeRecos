import React from 'react';
import { Link } from 'react-router-dom';

function PostEntryButton() {
    return (
        <Link to={"/crear-entrada"} >
            <button className="post-entry-btn">
                Publicar Entrada 📝
            </button>
        </Link>  
    )
}

export {PostEntryButton};