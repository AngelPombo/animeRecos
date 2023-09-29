import React, { useContext, useEffect, useRef, useState } from 'react';
import {addPhotoService, deletePhotoService, editEntryService} from '../../services/index';
import { useNavigate, useParams } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';
import {useEntry} from '../../hooks/useEntry';

function EditEntryPage() {

    const { logged } = useContext(sessionContext);
    const [editError, setEditError] = useState(null);
    const [editedEntry, setEditedEntry] = useState(false);
    let {id} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [genre, setGenre] = useState('');
    const [animeCharacter, setAnimeCharacter]  = useState('');
    const [img, setImg] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const {post, error, loading} = useEntry(id);
    const navigateTo = useNavigate();
    const formRef = useRef(null);

    const [imgPreview, setImgPreview] = useState();
    const [imgPreview2, setImgPreview2] = useState();
    const [imgPreview3, setImgPreview3] = useState();

    //este hook se actualiza cada vez que el estado editedEntry cambia
    useEffect(() => {
        //si editedEntry es true, es decir, se ha completado la edición de la entrada correctamente
        if(editedEntry){
            //navegamos a la ruta de OneEntry con el id que obtenemos por params
            navigateTo(`/entrada/${id}`);
        }
    },[editedEntry])

    if(loading){
        return <p>Cargando...</p>
    }

    if(error){
        return <p>Ha ocurrido un error cargando el contenido previo de la entrada</p>
    }

    function handleChange (e){
        const {name}= e.target;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value

        if (name === 'title'){
            setTitle(value)
        }
        if (name === 'content'){
            setContent(value)
        }
        if (name === 'category'){
            setCategory(value)
        }
        if (name === 'genre'){
            setGenre(value)
        }
        if (name === 'animeCharacter'){
            setAnimeCharacter(value)
        }     
                
        if (name === 'img'){
            setImg(value);
            setImgPreview(URL.createObjectURL(value));
            
        }
        if (name === 'img2'){
            setImg2(value);
            setImgPreview2(URL.createObjectURL(value));
        }
        if (name === 'img3'){
            setImg3(value);
            setImgPreview3(URL.createObjectURL(value));
        }
    }

    async function handleDeleteImage (e){
        e.preventDefault();

        const {name}= e.target;

        let token;

        if(logged){
            token = window.localStorage.getItem("jwt");
        }

        if (name === 'prevImg1'){
            setImg(null);
            setImgPreview(null);
            formRef.current.reset();
            
            try{
                
                await deletePhotoService(id, post[2][0].photo_id, token);

            }catch(e){
                setEditError(e.message);
            }
            
        }

        if (name === 'prevImg2'){
            setImg2(null);
            setImgPreview2(null);
            formRef.current.reset();
            
            try{
                
                await deletePhotoService(id, post[2][1].photo_id, token);
                
            }catch(e){
                setEditError(e.message);
            }
        }

        if (name === 'prevImg3'){
            setImg3(null);
            setImgPreview3(null);
            formRef.current.reset();

            
            try{
                
                await deletePhotoService(id, post[2][0].photo_id, token);
                
            }catch(e){
                setEditError(e.message);
            }
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData (e.target); 

        let token;

        try{
            if(logged){
                token = window.localStorage.getItem("jwt");
            }

            
            setEditError(null);
            
            await editEntryService(data, token, id);
            const {insertId} = await addPhotoService(token, id, data);
            console.log(insertId);
            
        }catch(e){
            setEditError(e.message);
            
        }finally{
            if(editError === null){
                setEditedEntry(true);
            }
        }
    }

    return (
            <section className="edit-entry-page">
            <form ref={formRef} onSubmit={handleSubmit}>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="title">Título:</label>
                            <input  type="text" name="title" id="title" defaultValue={post[0][0].title}  onChange={handleChange} required />
                        </li>
                        <li>
                            <label htmlFor="content">Contenido:</label>
                            <textarea  type="text" name="content" id="content" defaultValue={post[0][0].content} onChange={handleChange} required/>
                        </li>
                        <li>
                            <label htmlFor="category">Categoría:</label>
                            <select  name="category" id="category" onChange={handleChange} required defaultValue={post[0][0].category}>
                                <option value="recomendaciones">Recos</option>
                                <option value="teorias">Teorías</option>
                                <option value="fanArt">FanArts</option>
                                <option value="openings">Openings</option>
                                <option value="cosplays">Cosplays</option>
                                <option value="memes">Memes</option>
                            </select>
                        </li>
                        <li>
                        <label htmlFor="genre">Género:</label>
                            <select  name="genre" id="genre" onChange={handleChange} required defaultValue={post[0][0].genre}>
                                <option value="accion">Acción</option>
                                <option value="aventura">Aventura</option>
                                <option value="deportes">Deporte</option>
                                <option value="comedia">Comedia</option>
                                <option value="drama">Drama</option>
                                <option value="fantasia">Fantasía</option>
                                <option value="musical">Musical</option>
                                <option value="romance">Romance</option>
                                <option value="ciencia-ficcion">Ciencia-ficción</option>
                                <option value="sobrenatural">Sobrenatural</option>
                                <option value="thriller">Thriller</option>
                                <option value="terror">Terror</option>
                                <option value="psicologico">Psicológico</option>
                                <option value="infantil">Infantil</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="anime-character">Personaje:</label>
                            <input  type="text" name="anime-character" id="anime-character" defaultValue={post[0][0].anime_character} onChange={handleChange} />
                        </li>
                        <label className="upload-img-1">

                            <input onChange={handleChange}  type="file" name='img' id='img' accept='image/*' className="input-file"/>
                            {
                                post[2].length > 0 ?
                                <img name="prevImg1" src={`${import.meta.env.VITE_API_URL}/photoentries/${post[2][0].name_photo}`} onClick={handleDeleteImage} alt={post[2][0].name_photo}/>
                                :
                                <figure>
                                        <img src="https://cdn.icon-icons.com/icons2/1182/PNG/512/1490129350-rounded06_82174.png" alt="Selección de imagen" title="Selecciona una imagen"/>
                                        <figcaption>¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                </figure>
                            }
                            

                        
                        </label>
                        
                        {img && <label className="upload-img-2">
                            <input onChange={handleChange} type="file" name='img2' id='img2' accept='image/*' className="input-file"/>
                            {
                                post[2].length > 0 ?
                                <img name="prevImg2" src={`${import.meta.env.VITE_API_URL}/photoentries/${post[2][0].name_photo}`} onClick={handleDeleteImage} alt="Imagen previa a la edición"/>
                                :
                                <figure>
                                        <img src="https://cdn.icon-icons.com/icons2/1182/PNG/512/1490129350-rounded06_82174.png" alt="Selección de imagen" title="Selecciona una imagen"/>
                                        <figcaption>¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                </figure>
                            }
                            
                        </label>}
                        
                        {img2 && <label className="upload-img-3">
                            <input onChange={handleChange} type="file" name='img3' id='img3' accept='image/*' className="input-file"/>
                            {
                                post[2].length > 0 ?
                                <img name="prevImg3" src={`${import.meta.env.VITE_API_URL}/photoentries/${post[2][0].name_photo}`}  onClick={handleDeleteImage} alt={post[2][0].name_photo}/>
                                :
                                <figure>
                                        <img src="https://cdn.icon-icons.com/icons2/1182/PNG/512/1490129350-rounded06_82174.png" alt="Selección de imagen" title="Selecciona una imagen"/>
                                        <figcaption>¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                </figure>
                            }
                            
                        </label>}
                        
                        
                    </ul>
                </fieldset>
                {editError ? <p>{editError}</p> : null}
        
                <button>Publicar</button>
            </form>
        </section>
    )
}

export {EditEntryPage};