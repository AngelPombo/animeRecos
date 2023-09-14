import { useEffect, useState } from "react";

function useEntries(endpoint){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        
        async function getData(endpoint){
            
            try{
                setIsLoading(true);
                const res = await fetch(endpoint);
                const dataJSON = await res.json();

                setData(dataJSON);
                
            }catch(e){
                setError(e.message);
            } finally{
                setIsLoading(false);
            }
        }

        getData(endpoint);
    }, [endpoint]);

    return {data, error, isLoading};
}

export {useEntries};

