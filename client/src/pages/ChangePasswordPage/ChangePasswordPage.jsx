import React, { useContext, useEffect, useState } from 'react';
import { changePwdService } from '../../services';
import { useNavigate } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';
import "./ChangePasswordPage.css";

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
            <section className="change-pwd-section">
                <form onSubmit={handleSubmit} className="change-pwd-form">
                    <ul className="change-pwd-ul">
                        <li className="change-pwd-li">
                            <label className="change-pwd-label" htmlFor="currentPwd">Contraseña</label>
                            <input className="change-pwd-input" name="currentPwd" id="currentPwd" type="password" maxLength="20" required></input>
                        </li>
                        <li className="change-pwd-li">
                            <label htmlFor="newPwd" className="change-pwd-label">Nueva contraseña</label>
                            <input className="change-pwd-input" name="newPwd" id="newPwd" type="password" maxLength="20" required></input>
                        </li>
                        <li className="change-pwd-li">
                            <label htmlFor="confirmPwd" className="change-pwd-label">Repite la nueva contraseña</label>
                            <input className="change-pwd-input" name="confirmPwd" id="confirmPwd" type="password" maxLength="20" required></input>
                        </li>
                    </ul>
                    <button className="change-pwd-btn" type="submit">Guardar cambios</button>
                    {error ? <p className="feedback-msg">{error}</p> : null}
                </form>
            </section>
    )
}

export {ChangePasswordPage};