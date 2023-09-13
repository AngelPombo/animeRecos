import { useEffect, useState } from "react";

function useEntries(endpoint){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        setIsLoading(true);
        async function getData(endpoint){
            
            try{
                const res = await fetch(endpoint);
                const dataJSON = await res.json();

                setData(dataJSON);
                setIsLoading(false);
            }catch(e){
                console.log("Oops! error: " + e.message);
            }  
        }

        getData(endpoint);
    }, [endpoint]);

    return {data, isLoading};
}

export {useEntries};

