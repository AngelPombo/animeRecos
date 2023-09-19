import React from 'react';
import { TopHeader } from './TopHeader';
import { NavBar } from './NavBar';
import './Header.css';
import { UserHeader } from './UserHeader';

function Header() {
    return (
        <header>
            <TopHeader/>
            <NavBar />
            <UserHeader />
        </header>
    )
}

export {Header};