import React from 'react';
import {HeaderButton} from '../Buttons/HeaderButton';

function NavBar() {

    return (
        <nav className="nav-header">
            <ul className="ul-header">
                <li><HeaderButton category="recos"/></li>
                <li><HeaderButton category="fanArt"/></li>
                <li><HeaderButton category="memes"/></li>
                <li><HeaderButton category="teorías"/></li>
                <li><HeaderButton category="cosplays"/></li>
                <li><HeaderButton category="openings"/></li>
            </ul>
        </nav>
    )
}

export {NavBar};