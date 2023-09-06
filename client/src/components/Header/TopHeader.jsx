import React from 'react'
import imgUrlLogo from '/animeRecosIcono1.png';

function TopHeader() {
    return (
        <section className="top-header">
            <img className="logo" src={imgUrlLogo} alt="animeRecos"></img>
        </section>
    )
}

export {TopHeader}