import React, { useContext, useEffect, useState } from 'react';
import {editEntryService} from '../../services/index';
import { useNavigate, useParams } from 'react-router-dom';
import sessionContext from '../../context/sessionContext';
import {useEntry} from '../../hooks/useEntry';

function EditEntryPage() {
    //nos traemos si el usuario está loggeado del contexto
    const { logged } = useContext(sessionContext);

    //creamos un estado para saber si la edición de la entrada ha sido satisfactoria
    const [editedEntry, setEditedEntry] = useState(false);

    //creamos un estado que almacene los posibles errores que sucedan durante la edición
    const [editError, seteditError] = useState(null);

    //llamamos al hook useNavigate
    const navigateTo = useNavigate();

    //capturamos el id de los params con el hook
    let {id} = useParams();

    //nos traemos del hook useEntry, al que le pasamos el id que nos viene por params, el post, errores y si está cargando
    const {post, error, loading} = useEntry(id);

    //este hook se actualiza cada vez que el estado editedEntry cambia
    useEffect(() => {
        //si editedEntry es true, es decir, se ha completado la edición de la entrada correctamente
        if(editedEntry){
            //navegamos a la ruta de OneEntry con el id que obtenemos por params
            navigateTo(`/entrada/${id}`);
        }
    },[editedEntry])

    async function handleSubmit(e){
        e.preventDefault();

        //capturamos los valores del form
        let title = e.target.title.value;
        let content = e.target.content.value;
        let category = e.target.category.value;
        let genre = e.target.genre.value;
        let animeCharacter = e.target["anime-character"].value;

        //creamos la variable que va a almacenar el token
        let token;

        try{
            //si el usuario está loggeado, obtenemos el token del localStorage
            if(logged){
                token = window.localStorage.getItem("jwt");
            }

            //seteamos en el estado que la entrada aún no ha sido editada
            setEditedEntry(false);

            //seteamos en el estado que no hay errores
            seteditError(null);

            //función en la que se hace el fetch con los valores capturados del form
            await editEntryService({title, content, category, genre, animeCharacter, token, id});
        }catch(e){
            //seteamos que la entrada no ha sido editada, ya que ha saltado al catch
            setEditedEntry(false);

            //seteamos el mensaje de error
            seteditError(e.message);
        }finally{
            //si el estado editError sigue siendo null, no ha entrado en el catch, no hay errores
            if(editError === null){
                //entonces seteamos en el estado de editEntry que la entrada ha sido editada con éxito
                setEditedEntry(true);
            }
        }
    }

    //necesario para que pueda tener los valores por defecto el form
    if(loading){
        return <p>Cargando...</p>
    }


    //Form con valores por defecto de los datos que tenía el post
    //esto igual hay que componetizarlo, porque es igual al de post-entry pero con valores por defecto
    return (
            <section className="edit-entry-page">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="title">Título:</label>
                            <input type="text" name="title" id="title" defaultValue={post[0][0].title} />
                        </li>
                        <li>
                            <label htmlFor="content">Contenido:</label>
                            <textarea type="text" name="content" id="content" defaultValue={post[0][0].content} />
                        </li>
                        <li>
                            <label htmlFor="category">Categoría:</label>
                            <select name="category" id="category" defaultValue={post[0][0].category}>
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
                            <select name="genre" id="genre" defaultValue={post[0][0].genre}>
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
                            <input type="text" name="anime-character" id="anime-character" defaultValue={post[0][0].anime_character} />
                        </li>
                    </ul>
                </fieldset>
                {error ? <p>{error}</p> : null}
                <button type="submit">Guardar cambios</button>
            </form>
        </section>
    )
}

export {EditEntryPage};