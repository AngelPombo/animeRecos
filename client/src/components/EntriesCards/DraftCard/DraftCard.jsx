import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import sessionContext from '../../../context/sessionContext';
import { useNavigate } from 'react-router-dom';
import { addPhotoService } from '../../../services';

function DraftCard({post}) {
    //esto igual hay que meterlo en utils para no tener que crear tantas veces la misma variable
    const baseUrl = import.meta.env.VITE_API_URL;

    //traemos del contexto si el user está logueado y su id
    const {logged, userId} = useContext(sessionContext);

    //llamamos al hook useNavigate que vamos a utilizar en la función
    //const navigateTo = useNavigate();


    async function handleSubmit(e){
        e.preventDefault();
        
        /* console.log(e.target.img.files[0]) */
      
        const form = e.target
        const img = e.target.img.files[0]

        /* const img2 = e.target.img2.files[1]
        const img3 = e.target.img3.files[2] */
        
        const formData = new FormData();

        formData.append("img", img, img.name)

        // Display the values
        /* for (const value of formData.values()) {
        console.log(value);
        }  */
        
        const token = window.localStorage.getItem("jwt")
      
               
        try {
            const entry_id = post[0][0].entry_id
            await addPhotoService({token, entry_id, formData})   

        } catch (error) {
            console.log(error)
            
        }
    }

    

    if(post[2].length === 0 && !post[0][0].video_url){
        return (
            <article className='novedades-card'>
                <h4>{post[0][0].user_name}</h4>
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
                    <form id='formElem' onSubmit={handleSubmit} action="/photoentries" method="post" encType='multipart/form-data'>
                        <label htmlFor="img"></label>
                        <input type="file" name='img' id='img'/>
                       {/*  <label htmlFor="img2"></label>
                        <input type="file" name='img2' id='img2'/>
                        <label htmlFor="img3"></label>
                        <input type="file" name='img3' id='img3'/> */}
                        <button type='submit'>publicar</button>
                    </form>
                    :
                    null
                }

            </article>
        )
    } else if(post[0][0].video_url){
        return(
            <article>
                <h4>{post[0][0].user_name}</h4>
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
                    <form id='formElem' onSubmit={handleSubmit} action="/photoentries" method="post" encType='multipart/form-data'>
                        <label htmlFor="img"></label>
                        <input type="file" name='img' id='img'/>
                       {/*  <label htmlFor="img2"></label>
                        <input type="file" name='img2' id='img2'/>
                        <label htmlFor="img3"></label>
                        <input type="file" name='img3' id='img3'/> */}
                        <button type='submit'>publicar</button>
                    </form>
                    :
                    null
                }
            </article>
        )
    } else {
        return(
            <article>
                <h4>{post[0][0].user_name}</h4>
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
                    <form id='formElem' onSubmit={handleSubmit} action="/photoentries" method="post" encType='multipart/form-data'>
                         <label htmlFor="img"></label>
                        <input type="file" name='img' id='img'/>
                       {/*  <label htmlFor="img2"></label>
                        <input type="file" name='img2' id='img2'/>
                        <label htmlFor="img3"></label>
                        <input type="file" name='img3' id='img3'/> */}
                        <button type='submit'>publicar</button>
                    </form>
                    :
                    null
                }
            </article>
        )
    }
}

export {DraftCard};