import React, { useContext, useEffect, useState } from 'react'
import { postEntryService } from '../../services';
import { useNavigate } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';

function PostEntryPage() {
    //por los headers el auth, que está guardado en el localStorage
    const { logged } = useContext(sessionContext);
    const [postEntry, setPostEntry] = useState(false);
    const [error, setError] = useState(null);
    const navigateTo = useNavigate();
    const [idEntry, setidEntry]= useState(null);
    const [buttonPhotoClicked, setButtonPhotoClicked]= useState(false);
    const [buttonPostClicked, setButtonPostClicked]= useState(false);
    

    useEffect(() => {
       
        if(postEntry){
            if (buttonPhotoClicked){
                navigateTo(`/borrador/${idEntry}`);
            }
            if (buttonPostClicked){
                navigateTo(`/novedades`);
            }
                        
        }
    },[postEntry])
    
    function handlePhotoClick(){
        setButtonPhotoClicked(true)
    }

    function handlePostClick(){
        setButtonPostClicked(true)
    }


    async function handleSubmit(e){
        e.preventDefault();

        let title = e.target.title.value;
        let content = e.target.content.value;
        let category = e.target.category.value;
        let genre = e.target.genre.value;
        let animeCharacter = e.target["anime-character"].value;
        let token;

        try{
            if(logged){
                token = window.localStorage.getItem("jwt");
            }

            setPostEntry(false);
            setError(null);
            const {insertId} = await postEntryService({title, content, category, genre, animeCharacter, token});
            setidEntry(insertId);
            
            
        }catch(e){
            setPostEntry(false);
            setError(e.message);
            setidEntry(null);
        }finally{
            e.target.title.value = "";
            e.target.content.value = "";
            e.target.category.value = "";
            e.target.category.value = "";
            e.target.genre.value = "";
            e.target["anime-character"].value = "";

            if(error === null){
                setPostEntry(true);
            }
        }
    }
    
    return (
        <section className="post-entry-page">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="title">Título:</label>
                            <input type="text" name="title" id="title" placeholder='Escribe un título...' />
                        </li>
                        <li>
                            <label htmlFor="content">Contenido:</label>
                            <textarea type="text" name="content" id="content" placeholder='Escribe el contenido...' />
                        </li>
                        <li>
                            <label htmlFor="category">Categoría:</label>
                            <select name="category" id="category">
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
                            <select name="genre" id="genre">
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
                            <input type="text" name="anime-character" id="anime-character" placeholder='Escribe el nombre del personaje...' />
                        </li>
                        
                    </ul>
                </fieldset>
                {error ? <p>{error}</p> : null}
                <button onClick={handlePhotoClick} type="submit">Añadir foto</button>
                <button onClick= {handlePostClick} type='submit'>Publicar</button>
            </form>
        </section>
    )
}

export {PostEntryPage};