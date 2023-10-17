import React from 'react';
import { TopHeader } from './TopHeader';
import './Header.css';
import { UserHeader } from './UserHeader';

function Header() {
    return (
        <header className='main-header'>
            <TopHeader/>
            <UserHeader />
        </header>
    )
}

export {Header};