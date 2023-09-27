import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { newUserProfile } from '../../services';
import sessionContext from '../../context/sessionContext';

function EditProfileForm() {

    const {id} = useParams();
    const [editedUser, setEditedUser] = useState(false);
    const [editError, setEditError] = useState(null);
    const currentId = window.localStorage.getItem("id");
    const token = window.localStorage.getItem("jwt");
    const navigateTo = useNavigate();

    const {user, error, loading} = useUser(currentId, token);

    useEffect(() => {
        if(editedUser){
            navigateTo(`/perfil-usuario/${id}`);
        }
    },[editedUser])

    async function handleSubmit(e){
        e.preventDefault();

            try{
                setEditedUser(false);
                setEditError(null);

                const nick = e.target.nick.value;
                const email = e.target.email.value;
                /* const avatar =  */
                const bio = e.target.bio.value;
                const linkInsta = e.target.linkInsta.value;
                const linkYoutube = e.target.linkYoutube.value;
                const linkTtv = e.target.linkTtv.value;
                const linkTwitter = e.target.linkTwitter.value;

                if(currentId === id){
                    await newUserProfile({id, token,nick, email, bio, linkInsta, linkYoutube, linkTtv, linkTwitter});
                }
                
            }catch(e){

                setEditedUser(false);
                setEditError(e.message);

            }finally{

                if(editError === null){
                    setEditedUser(true);
                }
            }
    }

    function handleClick(){
        navigateTo(`/cambiar-password/${id}`);
    }

    if(loading){
        return <p>Cargando...</p>
    }

    return (
        
        <section>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label htmlFor="nick">Nombre de usuario</label>
                        <input type="text" name="nick" id="nick" defaultValue={user[0].user_name}></input>
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" defaultValue={user[0].email}></input>
                    </li>
                    <li>
                        <label htmlFor="avatar">Avatar</label>
                        <input type="file" name="avatar" id="avatar" filename={user[0].avatar}></input>
                    </li>
                    <li>
                        <label htmlFor="bio">Biografía</label>
                        <textarea name="bio" id="bio" defaultValue={user[0].biography}></textarea>
                    </li>
                    <li>
                        <fieldset>
                            <legend>Redes</legend>
                            <ul>
                                <li>
                                    <label htmlFor="linkInsta">Instagram</label>
                                    <input type="text" name="linkInsta" id="linkInsta" defaultValue={user[0].link_insta}></input>
                                </li>
                                <li>
                                    <label htmlFor="linkYoutube">YouTube</label>
                                    <input type="text" name="linkYoutube" id="linkYoutube" defaultValue={user[0].link_youtube}></input>
                                </li>
                                <li>
                                    <label htmlFor="linkTtv">Twitch</label>
                                    <input type="text" name="linkTtv" id="linkTtv" defaultValue={user[0].link_ttv}></input>
                                </li>
                                <li>
                                    <label htmlFor="linkTwitter">Twitter</label>
                                    <input type="text" name="linkTwitter" id="linkTwitter" defaultValue={user[0].link_twitter}></input>
                                </li>
                            </ul>
                        </fieldset>
                    </li>
                </ul>
                {error ? <p>{error}</p> : null}
                <button>Guardar cambios</button>
                <button onClick={handleClick}>Solicitar cambio de contraseña</button>
            </form>
        </section>
    )
}

export {EditProfileForm}