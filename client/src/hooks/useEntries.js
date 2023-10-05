import { useEffect, useState } from "react";

function useEntries(endpoint, token){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        
        async function getData(endpoint, token){
            try{
                setIsLoading(true);
                const res = await fetch(endpoint, {
                    headers: {
                        auth: token,
                    }
                });
                const dataJSON = await res.json();

                setData(dataJSON);
                
            }catch(e){
                setError(e.message);
            } finally{
                setIsLoading(false);
            }
        }

        getData(endpoint, token);
    }, [endpoint]);

    return {data, error, isLoading};
}

export {useEntries};

