import { useEffect, useState } from "react";
import { getOneEntryService } from "../services";

function useEntry (id){
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPost (){
            try{
                setLoading(true);
                const data = await getOneEntryService(id);

                setPost(data);
            }catch(e){
                setError(e.message);
            }finally{
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);

    return {post, error, loading};
};

export {useEntry};

