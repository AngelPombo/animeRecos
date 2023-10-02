import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [linkInsta, setLinkInsta]  = useState('');
    const [linkYoutube, setLinkYoutube]  = useState('');
    const [linkTtv, setLinkTtv]  = useState('');
    const [linkTwitter, setLinkTwitter]  = useState('');
    const [imgPreview, setImgPreview] = useState();
    const {logged, handleLogout} = useContext(sessionContext);
    const {user, error, loading} = useUser(currentId, token);

    useEffect(() => {
        if(editedUser){
            navigateTo(`/perfil-usuario/${id}`);
        }
    },[editedUser]);

    function handleChange (e){
        const {name}= e.target;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value
                
        if (name === 'nick'){
            setNick(value);
        }

        if (name === 'email'){
            setEmail(value);
        }

        if (name === 'avatar'){
            setAvatar(value);
            setImgPreview(URL.createObjectURL(value));
        }

        if (name === 'bio'){
            setBio(value);
        }

        if (name === 'linkInsta'){
            setLinkInsta(value);
        }     
                
        if (name === 'linkYoutube'){
            setLinkYoutube(value);
        }

        if (name === 'linkTtv'){
            setLinkTtv(value);
        }

        if (name === 'linkTwitter'){
            setLinkTwitter(value);
        }
    }

    function handleDeletePreview (e){
        e.preventDefault();

        const {name}= e.target;

        if (name === 'avatar'){
            setAvatar(null);
            setImgPreview(URL.createObjectURL(null));
            formRef.current.reset();
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData(e.target);

            try{
                setEditedUser(false);
                setEditError(null);
                if(logged){
                    if(currentId === id){
                        await newUserProfile(id, data, token);
                    }
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
                        <input type="text" name="nick" id="nick" defaultValue={user[0].user_name} onChange={handleChange}></input>
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" defaultValue={user[0].email} onChange={handleChange}></input>
                    </li>
                    <li>
                        <label htmlFor="avatar">
                        <input type="file" name="avatar" id="avatar" filename={user[0].avatar} accept='image/*' onChange={handleChange}></input>
                            {
                                    !avatar ? (
                                        <figure>
                                            <img src="https://cdn.icon-icons.com/icons2/1182/PNG/512/1490129350-rounded06_82174.png" alt="Selección de imagen" title="Selecciona una imagen"/>
                                            <figcaption>¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                        </figure>
                                    ) : (
                                        <figure>
                                            <img
                                                src={imgPreview}
                                                alt="Previsualización"
                                                onClick={handleDeletePreview}
                                            />
                                            <figcaption>Previsualización</figcaption>
                                        </figure>
                                    )
                            }
                        </label>
                        
                    </li>
                    <li>
                        <label htmlFor="bio">Biografía</label>
                        <textarea name="bio" id="bio" defaultValue={user[0].biography} onChange={handleChange}></textarea>
                    </li>
                    <li>
                        <fieldset>
                            <legend>Redes</legend>
                            <ul>
                                <li>
                                    <label htmlFor="linkInsta">Instagram</label>
                                    <input type="text" name="linkInsta" id="linkInsta" defaultValue={user[0].link_insta} onChange={handleChange}></input>
                                </li>
                                <li>
                                    <label htmlFor="linkYoutube">YouTube</label>
                                    <input type="text" name="linkYoutube" id="linkYoutube" defaultValue={user[0].link_youtube} onChange={handleChange}></input>
                                </li>
                                <li>
                                    <label htmlFor="linkTtv">Twitch</label>
                                    <input type="text" name="linkTtv" id="linkTtv" defaultValue={user[0].link_ttv} onChange={handleChange}></input>
                                </li>
                                <li>
                                    <label htmlFor="linkTwitter">Twitter</label>
                                    <input type="text" name="linkTwitter" id="linkTwitter" defaultValue={user[0].link_twitter} onChange={handleChange}></input>
                                </li>
                            </ul>
                        </fieldset>
                    </li>
                </ul>
                {error ? <p>{error}</p> : null}
                <button>Guardar cambios</button>
                <button onClick={handleClick}>Solicitar cambio de contraseña</button>
            </form>
            <div>
                <p>Los cambios serán efectivos la próxima vez que inices sesión.</p>
                
            </div>
        </section>
    )
}

export {EditProfileForm}