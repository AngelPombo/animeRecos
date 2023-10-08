import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { ThreeDots } from "react-loader-spinner";

function UserPage() {

    const token = window.localStorage.getItem("jwt");
    const {id} = useParams();
    
    const {user, error, loading} = useUser(id, token);

    if(loading){
        return <div className="loader-spinner">
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
    }
    if(error) return <p>{error}</p>;

    return (
        <UserProfile user={user}/>
    )
}

export {UserPage};
