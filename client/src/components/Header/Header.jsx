import React from 'react';
import { TopHeader } from './TopHeader';
import { NavBar } from './NavBar';
import './Header.css';

function Header() {
    return (
        <header>
            <TopHeader/>
            <NavBar />

        </header>
    )
}

export {Header};