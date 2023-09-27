import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUserService } from '../../services';
import sessionContext from '../../context/sessionContext';

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
        <section>
            <h4>¿Quieres eliminar tu cuenta?</h4>
            <button onClick={handleDelete}>Sí</button>
            <button onClick={handleBack}>No, volver al perfil</button>
            {error ? <p>{error}</p> : null}
        </section>
    )
}

export {DeleteUserPage};