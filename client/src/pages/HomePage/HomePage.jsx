import React from 'react';
import './HomePage.css';
import { useBlog } from "../../hooks/useBlog";

import {LastRecosList} from '../../components/LastRecosList/LastRecosList';
import { LastMemesList } from '../../components/LastMemesList/LastMemesList';


function HomePage() {


    return (
        <main className="home-page">
            <LastMemesList endpoint={"http://localhost:3001/entries/memes"}/>
            <LastRecosList endpoint={"http://localhost:3001/entries/recomendaciones"}/>
       
          { /* <LastPostList endpoint={"http://localhost:3001/entries/memes"}category="memes" maxnum = {1}/>*/}
   
        </main>
    )
}

export {HomePage};