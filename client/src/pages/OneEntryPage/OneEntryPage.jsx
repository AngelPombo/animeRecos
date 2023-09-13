import React from 'react'
import { OneEntryCard } from '../../components/EntriesCards/OneEntryCard/OneEntryCard';
import { useParams } from 'react-router-dom';
import { useEntry } from '../../hooks/useEntry';

function OneEntryPage() {

    const {idEntry} = useParams();
    const {post, error, loading} = useEntry(idEntry);

    if(loading) return <p>Cargando...</p>;
    if(error) return <p>Error</p>;

    return (
        <OneEntryCard post={post}/>
    )
}

export {OneEntryPage};