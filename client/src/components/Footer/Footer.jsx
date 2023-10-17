import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='main-footer'>
            &copy; Luis Cibeira, Ángel Pombo y Antía Varela
            <Link to ="/terminos-condiciones-uso">Términos y condiciones de uso</Link>
        </footer>
    )
}

export {Footer};