import React from 'react';
import './RegisterValidate.css';

function RegisterValidate() {
  return (
    <section className="section-validate">
        <h2>¡Último paso!</h2>
        <p>Para completar el registro debes validar tu cuenta a través del enlace que hemos enviado a tu email.</p>
        <div className="container-img-div-validate">
          <img src= "https://pa1.aminoapps.com/6048/5bf7bb9d19b665e256a3de88b19016eb94352222_hq.gif" alt="valida tu registro" />
        </div>
    </section>
  )
}

export {RegisterValidate}
