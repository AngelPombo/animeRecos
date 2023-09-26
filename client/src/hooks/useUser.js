import { useEffect, useState } from "react";
import { getUserInfoService } from "../services";

function useUser (id, token){
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUser (){
            try{
                setLoading(true);
                const data = await getUserInfoService(id, token);

                setUser(data);
            }catch(e){
                setError(e.message);
            }finally{
                setLoading(false);
            }
        }

        loadUser();
    }, [id]);

    return {user, error, loading};
};

export {useUser};