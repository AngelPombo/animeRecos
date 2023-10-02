import React, { useContext } from 'react'
import imgUrlLogo from '/animeRecosIcono1.png';
import { Link } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';
import { NavBar } from './NavBar';
import './Header.css'

function TopHeader() {

    const sessionUser = useContext(sessionContext)

    return (
        <section className="top-header">
            <Link to={"/"}><img className="logo" src={imgUrlLogo} alt="animeRecos" ></img></Link> 
            <NavBar />
        {
        sessionUser.logged ?
            <Link to={"/"}>
                <button onClick={sessionUser.handleLogout} className='top-header-button'>
                <svg className="login-cta" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z"/></svg>
                </button>
            </Link>  
            :
            <Link to={"/login"}>
                <button className='top-header-button'>
                <svg className='login-cta' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path fill="none" d="M0 0h24v24H0z"/><path d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z"/></svg>
                </button>  
            </Link>
        }
        </section>
    )
}

export {TopHeader}