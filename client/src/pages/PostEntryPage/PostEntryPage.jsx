import React, { useContext,  useRef,  useState } from 'react';
import { postEntryService } from '../../services';
import { useNavigate } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';

function PostEntryPage() {
    
    const { logged } = useContext(sessionContext);
    const [postError, setPostError] = useState(null);
    const navigateTo = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [genre, setGenre] = useState('');
    const [animeCharacter, setAnimeCharacter]  = useState('');
    const [video, setVideo] = useState('');
    const [img, setImg] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const formRef = useRef(null);

    const [imgPreview, setImgPreview] = useState();
    const [imgPreview2, setImgPreview2] = useState();
    const [imgPreview3, setImgPreview3] = useState();

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

    function handleDeleteImage (e){
        e.preventDefault();

        const {name}= e.target;

        if (name === 'img'){
            setImg(null);
            setImgPreview(URL.createObjectURL(null));
            formRef.current.reset();
        }

        if (name === 'img2'){
            setImg2(null);
            setImgPreview2(URL.createObjectURL(null));
            formRef.current.reset();
        }

        if (name === 'img3'){
            setImg3(null);
            setImgPreview3(URL.createObjectURL(null));
            formRef.current.reset();
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

            
            setPostError(null);
            
            await postEntryService(data, token);
            
        
        
            navigateTo(`/novedades`)
            
        }catch(e){
            setPostError(e.message);
            
        }
    }
    
    return (
        <section className="edit-entry-page">
            <form ref={formRef} onSubmit={handleSubmit} className="edit-entry-form">
                <fieldset className="edit-entry-fieldset">
                    <ul className="edit-entry-ul">
                        <li className="container-label-input">
                            <label className="edit-entry-label" htmlFor="title">Título</label>
                            <input className="input-title"  type="text" name="title" id="title" maxLength="100" onChange={handleChange} required />
                        </li>
                        <li className="container-label-input">
                            <label className="edit-entry-label" htmlFor="category">Categoría</label>
                            <select  className="select-category" name="category" id="category" onChange={handleChange} required>
                                <option value="recomendaciones">Recos</option>
                                <option value="teorias">Teorías</option>
                                <option value="fanArt">FanArts</option>
                                <option value="openings">Openings</option>
                                <option value="cosplays">Cosplays</option>
                                <option value="memes">Memes</option>
                            </select>
                        </li>
                        <li className="container-label-input">
                        <label className="edit-entry-label" htmlFor="genre">Género</label>
                            <select className="select-genre" name="genre" id="genre" onChange={handleChange} required >
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
                        <li className="container-label-input">
                            <label htmlFor="anime-character" className="edit-entry-label">Personaje <small>(opcional)</small></label>
                            <input className="input-character" type="text" name="anime-character" id="anime-character" maxLength="100" onChange={handleChange} />
                        </li>
                        <li className="container-label-input">
                            <label htmlFor="content" className="edit-entry-label">Contenido</label>
                            <textarea className="edit-entry-textarea" type="text" name="content" id="content" maxLength="10000" cols="100" rows="15" onChange={handleChange} required/>
                        </li>
                        
                        {
                            category === "openings" && 
                            <label>Video URL
                                <input type="text" name="video" id="video" maxLength="3000" required onChange={handleChange}></input>
                            </label>
                        }
                        {
                            category !== "openings" &&
                            <section className="section-select-photos">
                                <h4 className="edit-entry-label">Fotos <small>(opcional)</small></h4>
                                <ul className="ul-select-photos">
                                    <label className="upload-img-1">
                                    <input onChange={handleChange}  type="file" name='img' id='img' accept='image/*' className="input-file"/>
                                        {
                                            !img ? (
                                                <figure>
                                                    <img src="https://cdn.icon-icons.com/icons2/1182/PNG/512/1490129350-rounded06_82174.png" alt="Selección de imagen" title="Selecciona una imagen" className='upload-img-icon'/>
                                                    <figcaption className="figcaption">¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                                </figure>
                                            ) : (
                                                <figure>
                                                    <img className='preview-img'
                                                        src={imgPreview}
                                                        alt="Previsualización"
                                                        onClick={handleDeleteImage}
                                                    />
                                                    <figcaption className="figcaption">Previsualización</figcaption>
                                                </figure>
                                            )
                                        }
                                    </label>
                    
                                    {
                                        img && <label className="upload-img-2">
                                            <input onChange={handleChange} type="file" name='img2' id='img2' accept='image/*' className="input-file"/>
                                            {
                                                !img2 ? (
                                                    <figure>
                                                        <img src="https://cdn.icon-icons.com/icons2/1182/PNG/512/1490129350-rounded06_82174.png" alt="Selección de imagen" title="Selecciona una imagen" className='upload-img-icon'/>
                                                        <figcaption className="figcaption">¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                                    </figure>
                                                ) : (
                                                    <figure>
                                                        <img className='preview-img'
                                                            src={imgPreview2}
                                                            alt="Previsualización"
                                                            onClick={handleDeleteImage}
                                                        />
                                                        <figcaption className="figcaption">Previsualización</figcaption>
                                                    </figure>
                                                )
                                            }
                                        </label>
                                    }
                    
                                    {
                                        img2 && <label className="upload-img-3">
                                            <input onChange={handleChange} type="file" name='img3' id='img3' accept='image/*' className="input-file"/>
                                                {
                                                    !img3 ? (
                                                        <figure>
                                                            <img src="https://cdn.icon-icons.com/icons2/1182/PNG/512/1490129350-rounded06_82174.png" alt="Selección de imagen" title="Selecciona una imagen" className='upload-img-icon'/>
                                                            <figcaption className="figcaption">¡Sube una imagen a tu entrada (opcional)!</figcaption>
                                                        </figure>
                                                    ) : (
                                                        <figure>
                                                            <img className='preview-img'
                                                                src={imgPreview3}
                                                                alt="Previsualización"
                                                                onClick={handleDeleteImage}
                                                            />
                                                            <figcaption className="figcaption">Previsualización</figcaption>
                                                        </figure>
                                                    )
                                                }
                                        </label>
                                    }
                                </ul>
                            </section>
                        }
                    </ul>
                </fieldset>
                {postError ? <p>{postError}</p> : null}
                <div className="edit-entry-btn-div">
                    <button className="edit-entry-btn">Publicar</button>
                </div>
            </form>
        </section>
    )
}

export {PostEntryPage};