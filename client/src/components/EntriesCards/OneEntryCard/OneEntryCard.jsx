import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import sessionContext from '../../../context/sessionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CommentsList } from '../../CommentsList/CommentsList';
import { CommentForm } from '../../CommentForm/CommentForm';
import { useEntries } from '../../../hooks/useEntries';
import { VoteButton } from '../../Buttons/VoteButton';
import './OneEntryCard.css'

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
    
    const {data, error, isLoading} = useEntries(`${import.meta.env.VITE_API_URL}/comments/${idEntry}`, token, userId);

    const [dataComments, setDataComments] = useState([]);

    let valorInicialVotos;
    if(post[3][0].votos_entrada === null){
        valorInicialVotos = 0
    }else{
        valorInicialVotos = post[3][0].votos_entrada
    }


    const [votos, setVotos] = useState(valorInicialVotos);
    const [votado, setVotado] = useState(post[5]);
    

    useEffect(() => {

        setDataComments(data.data);

    }, [data])

    useEffect(() =>{
        if(!isLoading){
            let commentsListUl=document.getElementById("comments-list-id");
            let lastChildList = commentsListUl.lastElementChild;

            commentsListUl.scrollTo(0,(commentsListUl.scrollHeight + lastChildList.offsetHeight));
        }
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
            <>
                <article className='one-entry-card'>
                        <header className='one-entry-header'>
                            <section className='one-entry-user-info'>
                                {post[0][0].avatar ? <img className="one-entry-avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                                <div className='one-entry-username-badge'>
                                    {
                                        logged ?
                                        <Link to={`/perfil-usuario/${post[0][0].user_id}`}><h4>{post[0][0].user_name}</h4></Link>
                                        :
                                        <h4>{post[0][0].user_name}</h4>
                                    }
                                    <div className='one-entry-badge'>{post[0][0].user_badge}</div>
                                    </div>
                            </section>
                            <h5>{new Date(post[0][0].create_date).toLocaleDateString()}</h5>
                        </header>
                        <div className='one-entry-title-genre'>
                            <h3>{post[0][0].title}</h3>
                            <div className='one-entry-genre'>{post[0][0].category === "recomendaciones" ? "recos": post[0][0].category } - {post[0][0].genre}</div>
                        </div>
                        <p className='one-entry-content'>{post[0][0].content}</p>
                        <footer className='one-entry-footer'>
                            <div>
                                <p>{votos}</p>
                                {
                                    logged && <VoteButton setVotos={setVotos} setVotado={setVotado} votado={votado} />
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
                            </div>
                            {post[0][0].edited !== 0 && <p>{`Editada: ${new Date(post[0][0].last_update).toLocaleDateString()}`}</p>}
                        </footer>
                </article>
                <section className="comments-section">
                        <h5 className="comments-title">Comentarios</h5>
                        <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                        <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                </section>
            </>
        )
    } else if(post[0][0].video_url){
        return(
            <>
                <article className='one-entry-card'>
                    <header className='one-entry-header'>
                        <section className='one-entry-user-info'>
                            {post[0][0].avatar ? <img className="one-entry-avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                            <div className="one-entry-username-badge">
                                {
                                    logged ?
                                    <Link to={`/perfil-usuario/${post[0][0].user_id}`}><h4>{post[0][0].user_name}</h4></Link>
                                    :
                                    <h4>{post[0][0].user_name}</h4>
                                }
                                <div className="one-entry-badge">{post[0][0].user_badge}</div>
                            </div>
                        </section>
                        <h5>{new Date(post[0][0].create_date).toLocaleDateString()}</h5>
                    </header>
                    <div className='one-entry-title-genre'>
                        <h3>{post[0][0].title}</h3>
                        <div className='one-entry-genre'>{post[0][0].category === "recomendaciones" ? "recos": post[0][0].category } - {post[0][0].genre}</div>
                    </div>
                    <div className='one-entry-opening-div'>
                        <p className='one-entry-content'>{post[0][0].content}</p>
                        <div>
                            <ReactPlayer url={post[0][0].video_url}/>
                        </div>
                    </div>
                    <footer className='one-entry-footer'>
                                <div>
                                    <p>{votos}</p>
                                    {
                                        logged && <VoteButton setVotos={setVotos} setVotado={setVotado} votado={votado} />
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
                                </div>
                                {post[0][0].edited !== 0 && <p>{`Editada: ${new Date(post[0][0].last_update).toLocaleDateString()}`}</p>}
                    </footer>
                </article>
                <section className="comments-section">
                    <h5 className="comments-title">Comentarios</h5>
                    <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                    <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                </section>
            </>
            
        )
    } else {
        return(
            <>
                <article className='one-entry-card'>
                    <header className='one-entry-header'>
                        <section className='one-entry-user-info'>
                            {post[0][0].avatar ? <img className="one-entry-avatar" src={`${baseUrl}/avataruser/${post[0][0].avatar}`} alt={post[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={post[0][0].user_name}></img> }
                            <div className="one-entry-username-badge">
                                {
                                    logged ?
                                    <Link to={`/perfil-usuario/${post[0][0].user_id}`}><h4>{post[0][0].user_name}</h4></Link>
                                    :
                                    <h4>{post[0][0].user_name}</h4>
                                }
                                <div className="one-entry-badge">{post[0][0].user_badge}</div>
                            </div>
                        </section>
                        <h5>{new Date(post[0][0].create_date).toLocaleDateString()}</h5>
                    </header>
                    <div className='one-entry-title-genre'>
                        <h3>{post[0][0].title}</h3>
                        <div className='one-entry-genre'>{post[0][0].category === "recomendaciones" ? "recos": post[0][0].category } - {post[0][0].genre}</div>
                    </div>
                    <div className='one-entry-content-image-div'>
                        <p>{post[0][0].content}</p>
                        <div className="one-entry-image-div">
                            <img 
                                src={`${baseUrl}/photoentries/${post[2][0].name_photo}`} 
                                alt={post[2][0].name_photo} 
                            />
                        </div>
                    </div>
                    <footer className='one-entry-footer'>
                        <div>
                            <p>{votos}</p>
                            {
                                logged && <VoteButton setVotos={setVotos} setVotado={setVotado} votado={votado} />
                            }
                            
                            {
                                logged && parseInt(userId) === post[0][0].user_id &&
                                <div>
                                    <button onClick={handleClick}>Eliminar</button>
                                    <button onClick={handleEdit}>Editar</button>
                                </div>
                            }
                        </div>
                        {post[0][0].edited !== 0 && <p>{`Editada: ${new Date(post[0][0].last_update).toLocaleDateString()}`}</p>}
                    </footer>
                </article>
                <section className="comments-section">
                    <h5 className="comments-title">Comentarios</h5>
                    <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                    <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                </section>
            </>
            
        )
    }
}

export {OneEntryCard};