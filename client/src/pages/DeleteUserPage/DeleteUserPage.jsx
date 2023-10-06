import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUserService } from '../../services';
import sessionContext from '../../context/sessionContext';
import "./DeleteUserPage.css";

function DeleteUserPage() {
    const navigateTo = useNavigate();
    const {id} = useParams();

    const { logged, handleLogout } = useContext(sessionContext);

    const [deleteUser, setDeleteUser] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        if(deleteUser){
            handleLogout();
            navigateTo("/");
        }
    },[deleteUser])

    async function handleDelete (e){
        e.preventDefault();
        let token;

        try{
            setDeleteUser(false);

            if(logged){
                token = window.localStorage.getItem("jwt");
            }
            await deleteUserService(id, token);
        }catch(e){
            setDeleteUser(false);
            setError(e.message);
        }finally{
            if(error === null){
                setDeleteUser(true);
            }
        }
    }

    function handleBack(e){
        e.preventDefault();

        navigateTo(`/perfil-usuario/${id}`);
    }

    return (
            <section className='delete-user-section'>
                <h2>¿Estás segurx de que quieres eliminar tu cuenta?</h2>
                <div>
                    <button className='delete-user-btn' onClick={handleDelete}>Sí, estoy segurx</button>
                    <button className='delete-user-btn' onClick={handleBack}>No, volver al perfil</button>
                </div>
                {error ? <p>{error}</p> : null}
            </section>
    )
}

export {DeleteUserPage};