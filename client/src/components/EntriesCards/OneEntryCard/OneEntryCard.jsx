import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import sessionContext from '../../../context/sessionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CommentsList } from '../../CommentsList/CommentsList';
import { CommentForm } from '../../CommentForm/CommentForm';
import { useEntries } from '../../../hooks/useEntries';
import { VoteButton } from '../../Buttons/VoteButton';
import { EditEntryPage } from '../../../pages/EditEntryPage/EditEntryPage'
import './OneEntryCard.css'

function OneEntryCard({oneEntryPosts, setOneEntryPosts}) {

    const baseUrl = import.meta.env.VITE_API_URL;
    const {logged, userId} = useContext(sessionContext);
    const navigateTo = useNavigate();
    const {idEntry} = useParams();
    let token;
    const [wantEdit, setWantEdit] = useState(false);

    if(logged){
        token=window.localStorage.getItem("jwt");
    }
    
    const {data, error, isLoading} = useEntries(`${import.meta.env.VITE_API_URL}/comments/${idEntry}`, token, userId);
    const [dataComments, setDataComments] = useState([]);
    let valorInicialVotos;

    if(oneEntryPosts[3]){
        if(oneEntryPosts[3][0].votos_entrada === null){
            valorInicialVotos = 0
        }else{
            valorInicialVotos = oneEntryPosts[3][0].votos_entrada
        }
    }
    


    const [votos, setVotos] = useState(valorInicialVotos);
    const [votado, setVotado] = useState(oneEntryPosts[5]);
    

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
                    const res = await fetch(`${baseUrl}/entry/${oneEntryPosts[0][0].entry_id}`, {
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
        setWantEdit(true);
    }

        return (

            <>
                {
                    wantEdit && logged && parseInt(userId) === oneEntryPosts[0][0].user_id 
                    ?
                    <EditEntryPage post={oneEntryPosts} setWantEdit={setWantEdit} setOneEntryPosts={setOneEntryPosts}/>
                    :
                    <>
                        {
                            oneEntryPosts[2].length === 0 && !oneEntryPosts[0][0].video_url &&
                            <div className='conteiner-one-entry-card'>
                                <article className='one-entry-card'>
                                        <header className='one-entry-header'>
                                            <section className='one-entry-user-info'>
                                                {oneEntryPosts[0][0].avatar ? <img className="one-entry-avatar" src={`${baseUrl}/avataruser/${oneEntryPosts[0][0].avatar}`} alt={oneEntryPosts[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={oneEntryPosts[0][0].user_name}></img> }
                                                <div className='one-entry-username-badge'>
                                                    {
                                                        logged ?
                                                        <Link to={`/perfil-usuario/${oneEntryPosts[0][0].user_id}`}><h4>{oneEntryPosts[0][0].user_name}</h4></Link>
                                                        :
                                                        <h4>{oneEntryPosts[0][0].user_name}</h4>
                                                    }
                                                    <div className='one-entry-badge'>{oneEntryPosts[0][0].user_badge}</div>
                                                    </div>
                                            </section>
                                            <h5>{new Date(oneEntryPosts[0][0].create_date).toLocaleDateString()}</h5>
                                        </header>
                                        <div className='one-entry-title-genre'>
                                            <h3>{oneEntryPosts[0][0].title}</h3>
                                            <div className='one-entry-genre'>{oneEntryPosts[0][0].category === "recomendaciones" ? "recos": oneEntryPosts[0][0].category } - {oneEntryPosts[0][0].genre}</div>
                                        </div>
                                        <p className='one-entry-content'>{oneEntryPosts[0][0].content}</p>
                                        <footer className='one-entry-footer'>
                                            <div>
                                                <section className="one-entry-votes-section">
                                                    {
                                                        logged && <VoteButton setVotos={setVotos} setVotado={setVotado} votado={votado} />
                                                    }
                                                    <p className="one-entry-num-votos">{votos} votos</p>
                                                </section>
                                                
                                                {
                                                    //Lógica para que los botones eliminar y editar salgan en la publicación ampliada
                                                    //Sólo si estás logueado y tu id coincide con el id del user que publicó la entrada
                                                    logged && parseInt(userId) === oneEntryPosts[0][0].user_id
                                                    ?
                                                    <div className="one-entry-div-btn">
                                                        <button className="one-entry-btn-eliminar" onClick={handleClick}>Eliminar</button>
                                                        <button className="one-entry-btn-editar" onClick={handleEdit}>Editar</button>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                            {oneEntryPosts[0][0].edited !== 0 && <p className="edited-date">{`Editada: ${new Date(oneEntryPosts[0][0].last_update).toLocaleDateString()}`}</p>}
                                        </footer>
                                </article>
                                <section className="comments-section">
                                        <h5 className="comments-title">Comentarios</h5>
                                        <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                                        <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                                </section>
                            </div>
                        }
        
                        {
                            oneEntryPosts[0][0].video_url &&
                            <div className='conteiner-one-entry-card'>
                                <article className='one-entry-card'>
                                    <header className='one-entry-header'>
                                        <section className='one-entry-user-info'>
                                            {oneEntryPosts[0][0].avatar ? <img className="one-entry-avatar" src={`${baseUrl}/avataruser/${oneEntryPosts[0][0].avatar}`} alt={oneEntryPosts[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={oneEntryPosts[0][0].user_name}></img> }
                                            <div className="one-entry-username-badge">
                                                {
                                                    logged ?
                                                    <Link to={`/perfil-usuario/${oneEntryPosts[0][0].user_id}`}><h4>{oneEntryPosts[0][0].user_name}</h4></Link>
                                                    :
                                                    <h4>{oneEntryPosts[0][0].user_name}</h4>
                                                }
                                                <div className="one-entry-badge">{oneEntryPosts[0][0].user_badge}</div>
                                            </div>
                                        </section>
                                        <h5>{new Date(oneEntryPosts[0][0].create_date).toLocaleDateString()}</h5>
                                    </header>
                                    <div className='one-entry-title-genre'>
                                        <h3>{oneEntryPosts[0][0].title}</h3>
                                        <div className='one-entry-genre'>{oneEntryPosts[0][0].category === "recomendaciones" ? "recos": oneEntryPosts[0][0].category } - {oneEntryPosts[0][0].genre}</div>
                                    </div>
                                    <div className='one-entry-opening-div'>
                                        <p className='one-entry-content'>{oneEntryPosts[0][0].content}</p>
                                        <div className='one-entry-video-div'>
                                            <ReactPlayer url={oneEntryPosts[0][0].video_url}/>
                                        </div>
                                    </div>
                                    <footer className='one-entry-footer'>
                                                <div>
                                                    <section className="one-entry-votes-section">
                                                        {
                                                            logged && <VoteButton setVotos={setVotos} setVotado={setVotado} votado={votado} />
                                                        }
                                                        <p className="one-entry-num-votos">{votos} votos</p>
                                                    </section>
                                                    
                                                    {
                                                        //Lógica para que los botones eliminar y editar salgan en la publicación ampliada
                                                        //Sólo si estás logueado y tu id coincide con el id del user que publicó la entrada
                                                        logged && parseInt(userId) === oneEntryPosts[0][0].user_id
                                                        ?
                                                        <div className="one-entry-div-btn">
                                                            <button className="one-entry-btn-eliminar" onClick={handleClick}>Eliminar</button>
                                                            <button className="one-entry-btn-editar" onClick={handleEdit}>Editar</button>
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                </div>
                                                {oneEntryPosts[0][0].edited !== 0 && <p className="edited-date">{`Editada: ${new Date(oneEntryPosts[0][0].last_update).toLocaleDateString()}`}</p>}
                                    </footer>
                                </article>
                                <section className="comments-section">
                                    <h5 className="comments-title">Comentarios</h5>
                                    <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                                    <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                                </section>
                            </div>
                        }
        
                        {
                            oneEntryPosts[2].length > 0 &&
                            <div className='conteiner-one-entry-card'>
                                <article className='one-entry-card'>
                                    <header className='one-entry-header'>
                                        <section className='one-entry-user-info'>
                                            {oneEntryPosts[0][0].avatar ? <img className="one-entry-avatar" src={`${baseUrl}/avataruser/${oneEntryPosts[0][0].avatar}`} alt={oneEntryPosts[0][0].user_name}></img> : <img className='avatar' src='https://ideogram.ai/api/images/direct/a9clBXDhS_GtGnjN4dzfKg' alt={oneEntryPosts[0][0].user_name}></img> }
                                            <div className="one-entry-username-badge">
                                                {
                                                    logged ?
                                                    <Link to={`/perfil-usuario/${oneEntryPosts[0][0].user_id}`}><h4>{oneEntryPosts[0][0].user_name}</h4></Link>
                                                    :
                                                    <h4>{oneEntryPosts[0][0].user_name}</h4>
                                                }
                                                <div className="one-entry-badge">{oneEntryPosts[0][0].user_badge}</div>
                                            </div>
                                        </section>
                                        <h5>{new Date(oneEntryPosts[0][0].create_date).toLocaleDateString()}</h5>
                                    </header>

                                    <div className='one-entry-title-genre'>
                                        <h3>{oneEntryPosts[0][0].title}</h3>
                                        <div className='one-entry-genre'>{oneEntryPosts[0][0].category === "recomendaciones" ? "recos": oneEntryPosts[0][0].category } - {oneEntryPosts[0][0].genre}</div>
                                    </div>
                                    <div className='one-entry-content-image-div'>
                                        <p>{oneEntryPosts[0][0].content}</p>
                                        <div className='galeria-div'>
                                            {
                                                oneEntryPosts[2].length === 1 ?
                                            
                                                    <div className='one-entry-one-photo'>
                                                        <img 
                                                        src={`${baseUrl}/photoentries/${oneEntryPosts[2][0].name_photo}`} 
                                                        alt={oneEntryPosts[2][0].name_photo} 
                                                        />
                                                    </div>
                                                :
                                                
                                                <div className="one-entry-image-div">
                                                {oneEntryPosts[2][0] && 
                                                <img 
                                                src={`${baseUrl}/photoentries/${oneEntryPosts[2][0].name_photo}`} 
                                                alt={oneEntryPosts[2][0].name_photo} 
                                                />
                                                }
                                                {oneEntryPosts[2][1] && 
                                                <img 
                                                src={`${baseUrl}/photoentries/${oneEntryPosts[2][1].name_photo}`} 
                                                alt={oneEntryPosts[2][1].name_photo} 
                                                />
                                                }
                                                {oneEntryPosts[2][2] && 
                                                <img 
                                                src={`${baseUrl}/photoentries/${oneEntryPosts[2][2].name_photo}`} 
                                                alt={oneEntryPosts[2][2].name_photo} 
                                                />
                                                }

                                                </div>
                                            
                                            }
                                        </div>
                                        
                                       
                                    </div>
                                    <footer className='one-entry-footer'>
                                        <div>
                                            <section className="one-entry-votes-section">
                                                {
                                                    logged && <VoteButton setVotos={setVotos} setVotado={setVotado} votado={votado} />
                                                }
                                                <p className="one-entry-num-votos">{votos} votos</p>
                                            </section>
                                            {
                                                logged && parseInt(userId) === oneEntryPosts[0][0].user_id &&
                                                <div className="one-entry-div-btn">
                                                    <button className="one-entry-btn-eliminar" onClick={handleClick}>Eliminar</button>
                                                    <button className="one-entry-btn-editar" onClick={handleEdit}>Editar</button>
                                                </div>
                                            }
                                        </div>
                                        {oneEntryPosts[0][0].edited !== 0 && <p className="edited-date">{`Editada: ${new Date(oneEntryPosts[0][0].last_update).toLocaleDateString()}`}</p>}
                                    </footer>
                                </article>
                                <section className="comments-section">
                                    <h5 className="comments-title">Comentarios</h5>
                                    <CommentsList error={error} isLoading={isLoading} dataComments={dataComments} setDataComments={setDataComments}/>
                                    <CommentForm setDataComments={setDataComments} dataComments={dataComments}/>
                                </section>
                            </div>
                        }
                    </>
                }
                
            </>
        )
}

export {OneEntryCard};