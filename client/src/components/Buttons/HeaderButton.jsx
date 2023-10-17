import React from 'react';
import { Link } from 'react-router-dom';

function HeaderButton({category, setClicked, clicked}) {

    function handleClick(){
        setClicked(!clicked)
    }

    return (
        <Link to={`/${category}`} >
            <button onClick={handleClick} className={`header-btn`}>
                {category}
            </button>
        </Link>  
    )
}

export {HeaderButton};