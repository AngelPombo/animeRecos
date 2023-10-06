import React, {useContext} from 'react'
import { OneEntryCard } from '../../components/EntriesCards/OneEntryCard/OneEntryCard';
import { useParams } from 'react-router-dom';
import { useEntry } from '../../hooks/useEntry';
import sessionContext from '../../context/sessionContext'

function OneEntryPage() {

    const {idEntry} = useParams();
    const {userId} = useContext(sessionContext);
    const {post, error, loading} = useEntry(idEntry, userId);

    if(loading) return <p>Cargando...</p>;
    if(error) return <p>Error</p>;

    return (
            <OneEntryCard post={post}/>
    )
}

export {OneEntryPage};