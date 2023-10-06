import React, { useContext, useEffect, useState } from 'react';
import { changePwdService } from '../../services';
import { useNavigate } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';

function ChangePasswordPage() {

    const { handleLogout } = useContext(sessionContext);
    const [error, setError] = useState(null);
    const [editedPwd, setEditedPwd] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        if(editedPwd){
            handleLogout();
            navigateTo("/login");
        }
    },[editedPwd])

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setEditedPwd(false);
            const currentPwd = e.target.currentPwd.value;
            const newPwd = e.target.newPwd.value;
            const confirmPwd = e.target.confirmPwd.value;
            const token = window.localStorage.getItem("jwt");
            const id = window.localStorage.getItem("id");

            if(newPwd !== confirmPwd){
                throw new Error("Las contraseñas no coinciden");
            }

            await changePwdService(currentPwd, newPwd, token, id);

        }catch(e){

            setEditedPwd(false);
            setError(e.message);

        }finally{
            if(error === null){
                setEditedPwd(true);
            }
        }
    }

    return (
            <section>
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="currentPwd">Contraseña</label>
                            <input name="currentPwd" id="currentPwd" type="password" maxLength="20"></input>
                        </li>
                        <li>
                            <label htmlFor="newPwd">Nueva contraseña</label>
                            <input name="newPwd" id="newPwd" type="password" maxLength="20"></input>
                        </li>
                        <li>
                            <label htmlFor="confirmPwd">Repite la nueva contraseña</label>
                            <input name="confirmPwd" id="confirmPwd" type="password" maxLength="20"></input>
                        </li>
                    </ul>
                    {error ? <p>{error}</p> : null}
                    <button type="submit">Guardar cambios</button>
                </form>
            </section>
    )
}

export {ChangePasswordPage};