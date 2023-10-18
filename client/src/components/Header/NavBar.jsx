import React, { useState } from 'react';
import {HeaderButton} from '../Buttons/HeaderButton';
import closeIcon from '/closeIcon.svg'

function NavBar() {

    const [clicked, setClicked] = useState(false)

    function handleClick(){
        setClicked(false)
    }

    return (
        <nav className="nav-header">
            <a className='burguer-btn' onClick={handleClick} href="#menu">
                <span></span><span></span><span></span>
            </a>
            <ul className={clicked ? "ul-header off" : "ul-header"} id='menu'>
                <li className='close-menu'><a href="#" id='close-menu-a'><img src={closeIcon} alt="Cerrar menú" id='close-menu-icon'/></a></li>
                <li><HeaderButton clicked={clicked} setClicked={setClicked} category="recos"/></li>
                <li><HeaderButton clicked={clicked} setClicked={setClicked} category="fanart"/></li>
                <li><HeaderButton clicked={clicked} setClicked={setClicked} category="memes"/></li>
                <li><HeaderButton clicked={clicked} setClicked={setClicked} category="teorias"/></li>
                <li><HeaderButton clicked={clicked} setClicked={setClicked} category="cosplays"/></li>
                <li><HeaderButton clicked={clicked} setClicked={setClicked} category="openings"/></li>
                <li><HeaderButton clicked={clicked} setClicked={setClicked} category="novedades"/></li>
            </ul>
        </nav>
    )
}

export {NavBar};