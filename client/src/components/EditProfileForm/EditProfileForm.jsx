import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { newUserProfile } from '../../services';
import sessionContext from '../../context/sessionContext';
import uploadIcon from "/upload.svg";
import "./EditProfileForm.css";
import { ThreeDots } from "react-loader-spinner";

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
        return <div className="loader-spinner">
                    <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#9da63d" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    />
                </div>
    }

    return (
        
        <section className='edit-profile-section'>
            <form className= "edit-profile-form"  onSubmit={handleSubmit}>
                <ul className='edit-profile-ul'>
                    <li className='edit-profile-li' >
                        <label htmlFor="avatar">
                            <input  className='input-edit-foto' type="file" name="avatar" id="avatar" filename={user[0].avatar} accept='image/*' onChange={handleChange}></input>
                                {
                                        !avatar ? (
                                            <div className='container-prev'>
                                                <figure className='figure-edit-foto'>
                                                    <img className='upload-icon' src={uploadIcon} alt="Selección de imagen" title="Selecciona una imagen"/>
                                                    <figcaption className='input-edit-foto' >¡Cambia tu foto de perfil!</figcaption>
                                                </figure>
                                            </div>
                                        ) : (
                                            <div className='container-prev'>
                                                <figure className='figure-edit-foto'>
                                                    <img
                                                        className='edit-profile-foto'
                                                        src={imgPreview}
                                                        alt="Previsualización"
                                                        onClick={handleDeletePreview}
                                                    />
                                                    <figcaption className='input-edit-foto' >Previsualización</figcaption>
                                                </figure>
                                            </div>
                                            
                                        )
                                }
                        </label>
                        
                    </li>
                    <li className='edit-profile-li'>
                        <label htmlFor="nick">Nombre de usuario</label>
                        <input className='input-edit-profile' type="text" name="nick" id="nick" maxLength="40" defaultValue={user[0].user_name} onChange={handleChange}></input>
                    </li>
                    <li className='edit-profile-li'>
                        <label htmlFor="email">Email</label>
                        <input className='input-edit-profile'  type="email" name="email" id="email" maxLength="256" defaultValue={user[0].email} onChange={handleChange}></input>
                    </li>

                    <li className='edit-profile-li' >
                        <label htmlFor="bio">Biografía</label>
                        <textarea className='edit-profile-textarea' name="bio" id="bio" maxLength="3000" defaultValue={user[0].biography} onChange={handleChange}></textarea>
                    </li>
                    <li className='edit-profile-li' >
                        <fieldset className='edit-profile-fieldset'>
                            <h4 className='edit-profile-h4'>Redes</h4>
                            <ul className='edit-profile-ul' >
                                <li className='edit-profile-li' >
                                    <label htmlFor="linkInsta">Instagram</label>
                                    <input className='input-edit-profile' type="text" name="linkInsta" id="linkInsta" maxLength="200" defaultValue={user[0].link_insta} onChange={handleChange}></input>
                                </li>
                                <li className='edit-profile-li' >
                                    <label htmlFor="linkYoutube">YouTube</label>
                                    <input className='input-edit-profile' type="text" name="linkYoutube" id="linkYoutube" maxLength="200" defaultValue={user[0].link_youtube} onChange={handleChange}></input>
                                </li>
                                <li className='edit-profile-li' >
                                    <label htmlFor="linkTtv">Twitch</label>
                                    <input className='input-edit-profile' type="text" name="linkTtv" id="linkTtv" maxLength="200" defaultValue={user[0].link_ttv} onChange={handleChange}></input>
                                </li>
                                <li className='edit-profile-li' > 
                                    <label htmlFor="linkTwitter">Twitter</label>
                                    <input className='input-edit-profile' type="text" name="linkTwitter" id="linkTwitter" maxLength="200" defaultValue={user[0].link_twitter} onChange={handleChange}></input>
                                </li>
                            </ul>
                        </fieldset>
                    </li>
                </ul>
                {error ? <p>{error}</p> : null}
                <div className='edit-profile-btn-div'>
                    <button className='edit-profile-btn'>Guardar cambios</button>
                    <button className='edit-profile-btn' onClick={handleClick}>Cambiar contraseña</button>
                </div>
                
            </form>
            <footer className='footer-edit-profile'>
                <p>Los cambios serán efectivos la próxima vez que inices sesión.</p>   
            </footer>
        </section>
    )
}

export {EditProfileForm}