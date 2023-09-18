import React, { useEffect } from 'react';
import { recoverPasswordService } from '../../services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecoverPasswordPage () {

    const [sendEmail, setSendEmail] = useState(false);
    const [error, setError] = useState(null);
    const navigateTo = useNavigate();

    useEffect(() => {
        if(sendEmail){
            navigateTo("/nueva-password");
        }
    },[sendEmail])
    
    async function handleSubmit(e){
        e.preventDefault();
        let email = e.target.email.value;
        
        const objEmailRecover = {
            email: email
        }

        try{
            setError(null);
            await recoverPasswordService(objEmailRecover);
        }catch(e){
            setError(e.message);
        }finally{
            e.target.email.value = "";

            if(error !== null){
                setSendEmail(true);
            }
        }
    }

    return (
        <section>
            <h2>Recuperación de contraseña</h2>
            <p>Introduce a continuación el email con el que has registrado tu cuenta y enviaremos el código de recuperación</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input name="email" id="email" type='email' placeholder='tuemail@ejemplo.com'></input>
                {error ? <p>{error}</p> : null}
                <button type='submit'>Enviar</button>
            </form>
        </section>
    );
}

export {RecoverPasswordPage};
