import React, { useEffect, useState } from 'react';
import { resetPasswordService } from '../../services';
import { useNavigate } from 'react-router-dom';

function NewPasswordWithCode() {
    const [error, setError] = useState(null);
    const [pwdRecovered, setPwdRecovered] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        navigateTo("/login");
    }, [pwdRecovered])

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

            if(error !== null){
                setPwdRecovered(true);
            }
        }
    }
    
    return (
            <section>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="regcode">Código de recuperación:</label>
                                <input type="text" name="regcode" id="regcode" placeholder='Copia y pega aquí el código enviado a tu correo...'/>
                            </li>
                            <li>
                                <label htmlFor="newpwd">Nueva contraseña:</label>
                                <input type="password" name="newpwd" id="newpwd" placeholder='Nueva constraseña...'/>
                            </li>
                        </ul>
                        {error ? <p>{error}</p> : null}
                    </fieldset>
                    <button type="submit">Enviar</button>
                </form>
            </section>
    )
}

export {NewPasswordWithCode};