import { useEffect, useState } from "react";

function useBlog(endpoint){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        setIsLoading(true);
        async function getData(endpoint){
            
            /* console.log("URL API USEBLOG:", endpoint); */
            try{
                const res = await fetch(endpoint);
                const dataJSON = await res.json();

                /* console.log("dataJSON ----", dataJSON); */

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

export {useBlog};

