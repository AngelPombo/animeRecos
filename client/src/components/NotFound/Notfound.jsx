import React from 'react'
import img404 from "/animerecos404.png"
import "./NotFound.css"

function NotFound() {
  return (
    <section className='not-found-section' >
      <img  className='not-found-img' src={img404} alt='Not found' />
    </section>
   
  )
}
 export {NotFound}