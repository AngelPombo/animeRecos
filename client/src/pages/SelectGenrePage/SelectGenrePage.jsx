import React, { useState } from 'react'
import {GenreButton} from "../../components/Buttons/GenreButton"
import "./SelectGenrePage.css"
import { Link, useParams } from 'react-router-dom';
import { AllByCategoryPage } from '../AllByCategoryPage/AllByCategoryPage';
import { TopRatedByCategoryPage } from '../TopRatedByCategoryPage/TopRatedByCategoryPage';
import { FilterCategoriesByGenre } from '../FilterCategoriesByGenre/FilterCategoriesByGenre';


function SelectGenrePage() {

    const genres = ['accion','aventura','deportes','comedia','drama','fantasia','musical','romance','ciencia-ficcion','sobrenatural','thriller','terror','psicologico','infantil'];

    const {category} = useParams(); 

    const [clicked, setClicked] = useState(false);

    const [viewGenre, setViewGenre] = useState("");

    function handleClick(){
        setClicked(!clicked);
    }

    function handleGenre(e){
        const targetBtn = e.target.name
        setViewGenre(targetBtn)
    }
    
    return (
        <section className="select-genre-page">
            <h2 className="title-page-category">{category === "recomendaciones" ? "recos" : category}</h2>
            <div className='select-genre-page-div'>
                <menu className='btn-menu' id='filtermenu'>
                    <div className="dropdown">
                        <button onClick={handleClick} className="drop-button">Géneros</button>
                        <div id="myDropdown" className={ clicked ? "dropdown-content show" : "dropdown-content"}>
                            <ul className="dropdown-genre-list">
                                <li><button onClick={handleGenre} name="todos" className='deploy-btn'>todos</button></li>
                                <li><button onClick={handleGenre} name="mas-votados" className='deploy-btn'>mas votados</button></li>
                                {genres.map((genre) => {
                                    return  <li key={genre}><button name={genre} onClick={handleGenre} className='deploy-btn'>{genre}</button></li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <ul className="btns-genre-list">
                        <li><button onClick={handleGenre} name="todos" className="genre-btn genre-btn-all">todos</button></li>
                        <li><button onClick={handleGenre} name="mas-votados" className='genre-btn genre-btn-top'>mas votados</button></li>
                        {genres.map((genre) => {
                            return  <li key={genre}><GenreButton setViewGenre={setViewGenre} category={category} genre={genre}/></li>
                        })}
                    </ul>
                </menu>
                <section>
                    {(viewGenre === "todos" || viewGenre === "") && <AllByCategoryPage/>}
                    {viewGenre === "mas-votados" && <TopRatedByCategoryPage />}
                    {genres.map((genre) => {return viewGenre === genre && <FilterCategoriesByGenre category={category} genre={genre}/>})}
                </section>
            </div>
        </section>
    );
}

export {SelectGenrePage};