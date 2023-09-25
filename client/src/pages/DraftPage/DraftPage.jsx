import React from 'react'

import { useParams } from 'react-router-dom';
import { useEntry } from '../../hooks/useEntry';
import { DraftCard } from '../../components/EntriesCards/DraftCard/DraftCard';



function DraftPage() {
    const {idEntry} = useParams();
    const {post, error, loading} = useEntry(idEntry);

    if(loading) return <p>Cargando...</p>;
    if(error) return <p>Error</p>;

    return (
        <DraftCard post = {post}/>
    )
}

export {DraftPage}
