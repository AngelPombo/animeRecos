import React, { useContext } from 'react'
import imgUrlLogo from '/animeRecosIcono1.png';
import { Link } from 'react-router-dom';
import loginIcon from "/login.png"
import logoutIcon from "/logout.png"
import sessionContext from '../../context/sessionContext';


function TopHeader() {

    const sessionUser = useContext(sessionContext)

    return (
        <section className="top-header">
        <Link to={"/"}><img className="logo" src={imgUrlLogo} alt="animeRecos" ></img></Link> 
        <Link to={"/login"}><img className='login-cta' src={loginIcon} alt='login'></img></Link>
        <Link to={"/"}>
            <button onClick={sessionUser.handleLogout}>
                <img className='login-cta' src={logoutIcon} alt='login'></img>

            </button>
        </Link>   

        </section>
    )
}

export {TopHeader}