import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import sessionContext from '../../../context/sessionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CommentsList } from '../../CommentsList/CommentsList';
import { CommentForm } from '../../CommentForm/CommentForm';
import { useEntries } from '../../../hooks/useEntries';

function OneEntryCard({post}) {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    //traemos del contexto si el user está logueado y su id
    const {logged, userId} = useContext(sessionContext);

    //llamamos al hook useNavigate que vamos a utilizar en la función
    const navigateTo = useNavigate();

    const {idEntry} = useParams();

    let token;

    if(logged){
        token=window.localStorage.getItem("jwt");
    }

    const {data, error, isLoading} = useEntries(`${import.meta.env.VITE_API_URL}/comments/${idEntry}`, token);

    const [dataComments, setDataComments] = useState([]);

    useEffect(() => {

        setDataComments(data.data);

    }, [data])

    useEffect(() =>{

    },[dataComments])


    //función que maneja el click en el botón delete
    function handleClick(){

        //esto entiendo que habría que cambiarlo, de momento pongo un confirm
        //para asegurarme de que el usuario quiere borrar la entrada
        const wantDelete = confirm("¿Seguro que quieres eliminar esta entrada?");

        //Si la respuesta del confirm es true, hacemos la función que elimina la entrada:
        if(wantDelete){
            //hacemos la función async porque necesitamos esperar al fetch
            async function deleteEntry(){                
                try{
                    //capturamos el token del localStorage
                    const token = window.localStorage.getItem("jwt");

                    //hacemos el fetch con el id de la entrada y enviamos el token
                    const res = await fetch(`${baseUrl}/entry/${post[0][0].entry_id}`, {
                        method: 'DELETE',
                        headers:{
                            auth: token,
                        }
                    });

                    //si la res.ok es false, tiramos un error
                    if(!res.ok){
                        throw new Error("Se ha producido un error eliminando la entrada")
                    }

                    //guardamos el mensaje del server
                    const data = await res.json();
            
                    //Retornamos el mensaje del server, hay que cambiar el alert
                    alert(`${data.message}. Será redirigido a la página de inicio.`);

                    //redirigimos a la página de inicio,
                    //no sé si queréis que lleve a novedades (igual que el post) >> puse inicio por poner una jeje
                    navigateTo("/");
                }catch(e){
                    //esto habría que hacerlo con algo mejor que un alert jeje
                    alert(e.message);
                }
            }

            //llamamos a la función que acabamos de crear
            deleteEntry();
        }
    }

    function handleEdit(){
        navigateTo(`/editar-entrada/${post[0][0].entry_id}`);
    }

    if(post[2].length === 0 && !post[0][0].video_url){
        return (
            <article className='novedades-card'>
                {
                    logged ?
                    <Link to={`/perfil-usuario/${post[0][0].user_id}`}><h4>{post[0][0].user_name}</h4></Link>
                    :
                    <h4>{post[0][0].user_name}</h4>
                }
                {post[0][0].avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                <div className='badge'>{post[0][0].user_badge}</div>
                <h3>{post[0][0].title}</h3>
                <div className='genre'>{post[0][0].genre}</div>
                <h5>{post[0][0].create_date}</h5>
                {/* {post.edited && <p>"Editado"</p>}
                {post.video_url && <div>{post.video_url}</div>} */}
                <p>{post[0][0].content}</p>
                {
                post.votes ? <p>{post.votes[0].votos_entrada}</p>
                : <p>0</p>
                }
                {
                    //Lógica para que los botones eliminar y editar salgan en la publicación ampliada
                    //Sólo si estás logueado y tu id coincide con el id del user que publicó la entrada
                    logged && parseInt(userId) === post[0][0].user_id
                    ?
                    <div>
                        <button onClick={handleClick}>Eliminar</button>
                        <button onClick={handleEdit}>Editar</button>
                    </div>
                    :
                    null
                }
                <section className="comments-section">
                    <h5>Comentarios</h5>
                    <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                    <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                </section>
            </article>
        )
    } else if(post[0][0].video_url){
        return(
            <article>
                {
                    logged ?
                    <Link to={`/perfil-usuario/${post[0][0].user_id}`}><h4>{post[0][0].user_name}</h4></Link>
                    :
                    <h4>{post[0][0].user_name}</h4>
                }
                {post[0][0].avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                <div>{post[0][0].user_badge}</div>
                <h3>{post[0][0].title}</h3>
                <h5>{post[0][0].create_date}</h5>
                <p>{post[0][0].content}</p>
                <ReactPlayer url={post[0][0].video_url}/>
                {
                post.votes ? <p>{post.votes[0].votos_entrada}</p>
                : <p>0</p>
                }
                {/* {post.edited && <p>"Editado"</p>}*/}
                {
                    //Lógica para que los botones eliminar y editar salgan en la publicación ampliada
                    //Sólo si estás logueado y tu id coincide con el id del user que publicó la entrada
                    logged && parseInt(userId) === post[0][0].user_id
                    ?
                    <div>
                        <button onClick={handleClick}>Eliminar</button>
                        <button onClick={handleEdit}>Editar</button>
                    </div>
                    :
                    null
                }
                <section className="comments-section">
                    <h5>Comentarios</h5>
                    <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                    <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                </section>
            </article>
        )
    } else {
        return(
            <article>
                {
                    logged ?
                    <Link to={`/perfil-usuario/${post[0][0].user_id}`}><h4>{post[0][0].user_name}</h4></Link>
                    :
                    <h4>{post[0][0].user_name}</h4>
                }
                {post[0][0].avatar ? <img className="avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                <div>{post[0][0].user_badge}</div>
                <h3>{post[0][0].title}</h3>
                <h5>{post[0][0].create_date}</h5>
                <p>{post[0][0].content}</p>
                {
                post.votes ? <p>{post.votes[0].votos_entrada}</p>
                : <p>0</p>
                }
                <img 
                src={`${baseUrl}/photoentries/${post[2][0].name_photo}`} 
                alt={post[2][0].name_photo} 
                />
                {/* {post.edited && <p>"Editado"</p>}
                {post.video_url && <div>{post.video_url}</div>} */}
                {
                    //Lógica para que los botones eliminar y editar salgan en la publicación ampliada
                    //Sólo si estás logueado y tu id coincide con el id del user que publicó la entrada
                    logged && parseInt(userId) === post[0][0].user_id
                    ?
                    <div>
                        <button onClick={handleClick}>Eliminar</button>
                        <button onClick={handleEdit}>Editar</button>
                    </div>
                    :
                    null
                }
                <section className="comments-section">
                    <h5>Comentarios</h5>
                    <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                    <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                </section>
            </article>
        )
    }
}

export {OneEntryCard};