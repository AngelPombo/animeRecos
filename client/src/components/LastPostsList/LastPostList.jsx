import React from 'react'
import {RecosCard} from "../EntriesCards/RecosCard/RecosCard";

function LastPostList({data}) {

    console.log("DATA POST------------", data);

    for (let i = 0; i < data.length; i++) {
        console.log(`Vuelta ${i} del FOR:`, data[i]);
    }

    console.log("--------------------MAP-----------------------")

    data.map((post) => console.log("id del post:", post.id))

    return (
        <ul>
        {data.map((post) => {
            <li key={post.id}><RecosCard post={post}/></li>
        })}
        </ul>
    );
}

export {LastPostList};