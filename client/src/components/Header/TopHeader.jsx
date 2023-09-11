import React from 'react'
import imgUrlLogo from '/animeRecosIcono1.png';
import { Link } from 'react-router-dom';

function TopHeader() {
    return (
        <section className="top-header">
        <Link to={"/"}><img className="logo" src={imgUrlLogo} alt="animeRecos" ></img></Link> 
        </section>
    )
}

export {TopHeader}