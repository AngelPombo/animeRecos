import React from 'react';

function HeaderButton({category}) {
    return (
        <button className="header-btn">
            {category}
        </button>
    )
}

export {HeaderButton};