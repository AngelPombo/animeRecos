import React, {useContext, useEffect, useState} from 'react'
import { OneEntryCard } from '../../components/EntriesCards/OneEntryCard/OneEntryCard';
import { useParams } from 'react-router-dom';
import { useEntry } from '../../hooks/useEntry';
import sessionContext from '../../context/sessionContext'
import { getOneEntryService } from '../../services';
import { ThreeDots } from "react-loader-spinner";

function OneEntryPage() {

    const {idEntry} = useParams();
    const {userId} = useContext(sessionContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [oneEntryPosts, setOneEntryPosts] = useState([]);

    useEffect(()=>{
        async function loadPost (){
            try{
                setLoading(true);
                const data = await getOneEntryService(idEntry, userId);

                setOneEntryPosts(data);
            }catch(e){
                setError(e.message);
            }finally{
                setLoading(false);
            }

            return {oneEntryPosts, error, loading};
        }

        loadPost();
    },[idEntry]);

    return (
        <>
        {
            loading ?
            <div className="loader-spinner">
                <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#9da63d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
                />
            </div>
            :
            <>
                {
                    error ?
                    <p>{error}</p>
                    :
                    <OneEntryCard oneEntryPosts={oneEntryPosts} setOneEntryPosts={setOneEntryPosts}/>
                }
            </>
                
        }
        
        </>
        
    )
}

export {OneEntryPage};