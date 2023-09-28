import React, { useContext, useEffect, useState } from 'react'
import { addPhotoService, postEntryService } from '../../services';
import { useNavigate } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';

function PostEntryPage() {
    
    const { logged } = useContext(sessionContext);
    const [error, setError] = useState(null);
    const navigateTo = useNavigate();
  
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [genre, setGenre] = useState('')
    const [animeCharacter, setAnimeCharacter]  = useState('')
    const [img, setImg] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()

   
    function handleChange (e){
        const {name}= e.target
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
            setImg(value)
            
        }
        if (name === 'img2'){
            setImg2(value)
        }
        if (name === 'img3'){
            setImg3(value)
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

         
            setError(null);
         
            await postEntryService(data, token);
            
      
        
           navigateTo(`/novedades`)
            
        }catch(e){
            setError(e.message);
          
        }
    }
    
    return (
        <section className="post-entry-page">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="title">Título:</label>
                            <input  type="text" name="title" id="title" placeholder='Escribe un título...'  onChange={handleChange} required />
                        </li>
                        <li>
                            <label htmlFor="content">Contenido:</label>
                            <textarea  type="text" name="content" id="content" placeholder='Escribe el contenido...' onChange={handleChange} required/>
                        </li>
                        <li>
                            <label htmlFor="category">Categoría:</label>
                            <select  name="category" id="category" onChange={handleChange} required>
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
                            <select  name="genre" id="genre" onChange={handleChange} required>
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
                            <input  type="text" name="anime-character" id="anime-character" placeholder='Escribe el nombre del personaje...' onChange={handleChange} />
                        </li>
                        <label>
                            <input onChange={handleChange}  type="file" name='img' id='img' accept='image/*'/>
                        </label>
                        
                        {img && <label>
                            <input onChange={handleChange} type="file" name='img2' id='img2' accept='image/*'/>
                        </label>}
                        
                        {img2 && <label>
                            <input onChange={handleChange} type="file" name='img3' id='img3' accept='image/*'/> 
                        </label>}
                        
                        
                    </ul>
                </fieldset>
                {error ? <p>{error}</p> : null}
        
                <button>Publicar</button>
            </form>
        </section>
    )
}

export {PostEntryPage};