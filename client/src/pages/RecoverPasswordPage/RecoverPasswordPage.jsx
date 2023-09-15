import React from 'react';
import { recoverPasswordService } from '../../services';
import { useState } from 'react';

function RecoverPasswordPage () {

    const [error, setError] = useState("");
    
    async function handleSubmit(e){
        e.preventDefault();
        const email = e.target.email.value;
        
        const objEmailRecover = {
            email: email
        }

        try{
            await recoverPasswordService(objEmailRecover);
        }catch(e){
            setError(e.message);
        }
    }

    // CUANDO METEMOS UN CORREO QUE NO VALE EL ERROR NO DESAPARECE CUANDO METES UNO QUE SI QUE VALE



    return (
        <section>
            <h2>Recuperación de contraseña</h2>
            <p>Introduce a continuación el email con el que has registrado tu cuenta y enviaremos el código de recuperación</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input name="email" id="email" type='email' placeholder='tuemail@ejemplo.com'></input>
                <button type='submit'>Enviar</button>
                {error ? <p>{error}</p> : null}
            </form>
        </section>
    );
}

export {RecoverPasswordPage};
