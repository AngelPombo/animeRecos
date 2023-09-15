import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

async function getOneEntryService (id){
    const res = await fetch(`${import.meta.env.VITE_API_URL}/entry/${id}`);
    const json = await res.json();

    if(!res.ok){
        throw new Error(json.message);
    }

    return json.data;
}

async function registerUserService ({ nick, email, pwd }){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/new-user`, {
      method: "POST",
      body: JSON.stringify({ nick, email, pwd }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const json = await response.json();
  
    if (!response.ok) {
      throw new Error(json.message);
    }
  };

   async function recoverPasswordService ({email}){
    
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/recover-password`, {
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataJSON = await res.json();
      
      if(!res.ok){
        throw new Error(dataJSON.message);
      }
   
  }  
    

export {getOneEntryService, registerUserService, recoverPasswordService};

