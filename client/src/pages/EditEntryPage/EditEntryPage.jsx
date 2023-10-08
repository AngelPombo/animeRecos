import React, { useContext, useEffect, useRef, useState } from 'react';
import {addPhotoService, deletePhotoService, editEntryService} from '../../services/index';
import { useNavigate, useParams } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';
import "./EditEntryPage.css";
import uploadIcon from "/upload.svg"


function EditEntryPage({post, setWantEdit, setOneEntryPosts}) {
    const { logged } = useContext(sessionContext);
    const [editError, setEditError] = useState(null);
    const [editedEntry, setEditedEntry] = useState(false);
    const [img, setImg] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const navigateTo = useNavigate();
    const formRef = useRef(null);
    const [imgPreview, setImgPreview] = useState();
    const [imgPreview2, setImgPreview2] = useState();
    const [imgPreview3, setImgPreview3] = useState();
    const [deletedImg1, setDeletedImg1] = useState(false);
    const [deletedImg2, setDeletedImg2] = useState(false);
    const [deletedImg3, setDeletedImg3] = useState(false);
    const [title, setTitle] = useState(post[0][0].title);
    const [content, setContent] = useState(post[0][0].content);
    const [category, setCategory] = useState(post[0][0].category);
    const [genre, setGenre] = useState(post[0][0].genre);
    const [animeCharacter, setAnimeCharacter]  = useState(post[0][0].anime_character);
    const [video, setVideo] = useState(post[0][0].video_url);
    const updatedPostString = JSON.stringify(post);
    let updatedPost = JSON.parse(updatedPostString);


    useEffect(() => {
        if(editedEntry){
            navigateTo(`/entrada/${post[0][0].entry_id}`);
        }
    },[editedEntry]);

    function handleChange (e){
        const {name}= e.target;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value


        if (name === 'title'){
            setTitle(value);
        }

        if (name === 'content'){
            setContent(value);
        }

        if (name === 'category'){
            setCategory(value);
        }

        if (name === 'genre'){
            setGenre(value);
        }

        if (name === 'animeCharacter'){
            setAnimeCharacter(value);
        }

        if(name === 'video'){
            setVideo(value);
        }

        if (name === 'img'){
            setImg(value);
            if(value){
                setImgPreview(URL.createObjectURL(value));
            }
            
            
        }

        if (name === 'img2'){
            setImg2(value);
            if(value){
                setImgPreview2(URL.createObjectURL(value));
            }
            
        }

        if (name === 'img3'){
            setImg3(value);
            if(value){
                setImgPreview3(URL.createObjectURL(value));
            }
            
        }
    }

    async function handleDeleteImg(e){

        const {name}= e.target;

        let token;

        if(logged){
            token = window.localStorage.getItem("jwt");
        }

        if (name === 'imgPost1' && (img2 === null || post[2].length < 2)){
            try{
                
                await deletePhotoService(post[0][0].entry_id, post[2][0].photo_id, token);

                setImg(null);
                setImgPreview(null);
                e.target.remove();
                formRef.current.reset();
                setDeletedImg1(true);
            }catch(e){
                setEditError(e.message);
            }finally{
                if(editError === null){
                    const eliminarFoto = updatedPost[2];
                    eliminarFoto.splice(0,1);
                    setOneEntryPosts(updatedPost);
                }
            }
            
        }

        if (name === 'imgPost2' && (img3 === null || post[2].length < 3)){
            try{
                
                await deletePhotoService(post[0][0].entry_id, post[2][1].photo_id, token);

                setImg2(null);
                setImgPreview2(null);
                e.target.remove();
                formRef.current.reset();
                setDeletedImg2(true);
                
            }catch(e){
                setEditError(e.message);
                setDeletedImg2(false);
            }
            finally{
                if(editError === null){
                    const eliminarFoto = updatedPost[2];
                    eliminarFoto.splice(1, 1);
                    setOneEntryPosts(updatedPost);
                }
            }
        }

        if (name === 'imgPost3'){
            try{
                
                await deletePhotoService(post[0][0].entry_id, post[2][2].photo_id, token);

                setImg3(null);
                setImgPreview3(null);
                e.target.remove();
                formRef.current.reset();
                setDeletedImg3(true);
                
            }catch(e){
                setEditError(e.message);
                setDeletedImg3(false);
            }finally{
                if(editError === null){
                    const eliminarFoto = updatedPost[2];
                    eliminarFoto.splice(2, 1);
                    setOneEntryPosts(updatedPost);
                }
            }
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData(e.target);

        let token;

        try{
            if(logged){
                token = window.localStorage.getItem("jwt");
            }

            
            setEditError(null);
            
            const {update} = await editEntryService(data, token, post[0][0].entry_id);

            updatedPost[0] = update;

            const {newPhotos} = await addPhotoService(token, post[0][0].entry_id, data);
            
            updatedPost[2] = newPhotos;

        }catch(e){
            setEditError(e.message);
            
        }finally{
            if(editError === null){
                setEditedEntry(true);
                setWantEdit(false);
                setOneEntryPosts(updatedPost)
            }
        }
    }

    return (
                <section className="edit-entry-page">
                        <form ref={formRef} onSubmit={handleSubmit} className="edit-entry-form">
                            <fieldset className="edit-entry-fieldset">
                                <ul className="edit-entry-ul">
                                    <li className="container-label-input">
                                        <label className="edit-entry-label" htmlFor="title" >Título</label>
                                        <input className="input-title" type="text" name="title" id="title" defaultValue={title}  onChange={handleChange} required />
                                    </li>
                                    <li className="container-label-input">
                                        <label htmlFor="category" className="edit-entry-label">Categoría</label>
                                        <select className="select-category" name="category" id="category" onChange={handleChange} required defaultValue={category}>
                                            <option value="Recomendaciones">Recos</option>
                                            <option value="Teorias">Teorías</option>
                                            <option value="FanArt">FanArts</option>
                                            <option value="Openings">Openings</option>
                                            <option value="Cosplays">Cosplays</option>
                                            <option value="Memes">Memes</option>
                                        </select>
                                    </li>
                                    <li className="container-label-input">
                                    <label htmlFor="genre" className="edit-entry-label">Género</label>
                                        <select className="select-genre" name="genre" id="genre" onChange={handleChange} required defaultValue={genre}>
                                            <option value="Acción">Acción</option>
                                            <option value="Aventura">Aventura</option>
                                            <option value="Deportes">Deporte</option>
                                            <option value="Comedia">Comedia</option>
                                            <option value="Drama">Drama</option>
                                            <option value="Fantasía">Fantasía</option>
                                            <option value="Musical">Musical</option>
                                            <option value="Romance">Romance</option>
                                            <option value="Ciencia-ficción">Ciencia-ficción</option>
                                            <option value="Sobrenatural">Sobrenatural</option>
                                            <option value="Thriller">Thriller</option>
                                            <option value="Terror">Terror</option>
                                            <option value="Psicológico">Psicológico</option>
                                            <option value="Infantil">Infantil</option>
                                        </select>
                                    </li>
                                    <li className="container-label-input">
                                        <label htmlFor="anime-character" className="edit-entry-label">Personaje <small>(opcional)</small></label>
                                        <input  className="input-character" type="text" name="anime-character" id="anime-character" defaultValue={animeCharacter} onChange={handleChange} />
                                    </li>
                                    <li className="container-label-input">
                                        <label htmlFor="content" className="edit-entry-label">Contenido</label>
                                        <textarea className="edit-entry-textarea" type="text" name="content" id="content" cols="100" rows="15" defaultValue={content} onChange={handleChange} required/>
                                    </li>
                                    {
                                        category === "openings" &&
                                        <li className="container-label-input">
                                            <label htmlFor="video" className="edit-entry-label">Video URL</label>
                                            <input className="input-title" type="text" name="video" id="video" maxLength="3000" defaultValue={video} required onChange={handleChange}></input>
                                        </li>
                                    }
                                </ul>
                                {
                                    category !== "openings" &&
                                    <section className="section-select-photos-videos">
                                        <h4 className="edit-entry-label">Fotos <small>(opcional)</small></h4>
                                        <ul className="ul-select-photos">
                                            <label className="upload-img-1">
                                                <input onChange={handleChange}  type="file" name='img' id='img' accept='image/*' className="input-file"/>
                                                {
                                                    post[2].length > 0 && !deletedImg1 ?
                                                    <li><img className="preview-img" name="imgPost1" id="imgPost1" src={`${import.meta.env.VITE_API_URL}/photoentries/${post[2][0].name_photo}`} alt={post[2][0].name_photo} onClick={handleDeleteImg}></img></li>
                                                    :
                                                    <>
                                                        
                                                        {
                                                            img ?
                                                                <img className="preview-img" name="prevImg1" src={imgPreview}/>
                                                            :
                                                            <figure>
                                                                    <img className="upload-img-icon" src={uploadIcon} alt="Selección de imagen" title="Selecciona una imagen"/>
                                                                    <figcaption className="figcaption">¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                                            </figure>
                                                        }
                                                    </>
                                                    
                                                }

                                            </label>
                                                
                                            <label className="upload-img-2">
                                                <input onChange={handleChange} type="file" name='img2' id='img2' accept='image/*' className="input-file"/>
                                                {
                                                    post[2].length > 1 && !deletedImg2 ?
                                                    <li><img className="preview-img" name="imgPost2" id="imgPost2" src={`${import.meta.env.VITE_API_URL}/photoentries/${post[2][1].name_photo}`} alt={post[2][1].name_photo} onClick={handleDeleteImg}></img></li>
                                                    :
                                                    <>
                                                        {
                                                        img2 ?
                                                        <img className="preview-img" name="prevImg2" src={imgPreview2} />
                                                        :
                                                        <figure>
                                                                <img className="upload-img-icon" src={uploadIcon} alt="Selección de imagen" title="Selecciona una imagen"/>
                                                                <figcaption className="figcaption">¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                                        </figure>
                                                        }
                                                    </>
                                                    
                                                    
                                                }
                                                    
                                                    
                                            </label>
                                                
                                            <label className="upload-img-3">
                                                <input onChange={handleChange} type="file" name='img3' id='img3' accept='image/*' className="input-file"/>
                                                {
                                                    post[2].length > 2 && !deletedImg3 ?
                                                    <li><img className="preview-img" name="imgPost3" id="imgPost3" src={`${import.meta.env.VITE_API_URL}/photoentries/${post[2][2].name_photo}`} alt={post[2][2].name_photo} onClick={handleDeleteImg}></img></li>
                                                    :
                                                    <>
                                                        
                                                        {
                                                            img3 ?
                                                            <img className="preview-img" name="prevImg3" src={imgPreview3}  />
                                                            :
                                                            <figure>
                                                                    <img className="upload-img-icon" src={uploadIcon} alt="Selección de imagen" title="Selecciona una imagen"/>
                                                                    <figcaption className="figcaption">¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                                            </figure>
                                                        }
                                                    </>
                                                }
                                                    
                                                    
                                            </label>
                                        </ul>
                                    </section>
                                }
                            </fieldset>
                            {editError ? <p>{editError}</p> : null}
                            <div className="edit-entry-btn-div">
                                <button className="edit-entry-btn">Publicar</button>
                            </div>
                        </form>
                </section>
    )
}

export {EditEntryPage};