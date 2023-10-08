import React, { useEffect, useState } from 'react';
import { resetPasswordService } from '../../services';
import { useNavigate } from 'react-router-dom';
import "./NewPasswordWithCode.css"

function NewPasswordWithCode() {
    const [error, setError] = useState(null);
    const [pwdRecovered, setPwdRecovered] = useState(false);
    const navigateTo = useNavigate();


    if (pwdRecovered){
        navigateTo("/login");
    }



    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            setPwdRecovered(false);
            const recoverCode = e.target.regcode.value;
            const newPassword = e.target.newpwd.value;
            
            setError(null);
            await resetPasswordService({recoverCode, newPassword});
        }catch(e){
            setPwdRecovered(false);
            setError(e.message);
        }finally{
            e.target.regcode.value = "";
            e.target.newpwd.value = "";

            if(error === null){
                setPwdRecovered(true);
            }
        }
    }
    
    return (
            <section className='recover-password-section'>
                <form  className="recover-password-form" onSubmit={handleSubmit}>
                    <fieldset className='fieldset-recuperation'>
                        <ul className='recuperation-ul'>
                            <li className='recuperation-li'>
                                <label className='recuperation-code-label' htmlFor="regcode">Código de recuperación</label>
                                <input className="recuperation-code-input" type="text" name="regcode" id="regcode" placeholder='Copia y pega aquí el código enviado a tu correo...' required/>
                            </li>
                            <li className='recuperation-li'>
                                <label className='recuperation-code-label'  htmlFor="newpwd">Nueva contraseña</label>
                                <input className="recuperation-code-input" type="password" name="newpwd" id="newpwd" placeholder='Nueva constraseña...' required/>
                            </li>
                        </ul>
                        {error ? <p className="error-msg">{error}</p> : null}
                    </fieldset>
                    <div>
                        <button className='recover-password-btn' type="submit">Enviar</button>
                    </div>
                </form>
            </section>
    )
}

export {NewPasswordWithCode};