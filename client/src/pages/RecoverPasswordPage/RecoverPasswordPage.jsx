import React, { useEffect } from 'react';
import { recoverPasswordService } from '../../services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RecoverPasswordPage.css";

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
        <main>
            <section className='recover-password-section'>
                <h2>Recuperación de contraseña</h2>
                <p>Introduce a continuación el email con el que has registrado tu cuenta y enviaremos el código de recuperación</p>
                <form className="recover-password-form" onSubmit={handleSubmit}>
                    <label className='recover-password-label' htmlFor='email'>Email</label>
                    <input className="recover-password-input" name="email" id="email" type='email' placeholder='tuemail@ejemplo.com' maxLength="256"></input>
                    {error ? <p>{error}</p> : null}
                    <div>
                        <button className='recover-password-btn' type='submit'>Enviar</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export {RecoverPasswordPage};
