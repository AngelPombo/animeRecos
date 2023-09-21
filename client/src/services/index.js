
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

  async function resetPasswordService ({recoverCode, newPassword}){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/reset-password`, {
      method: "POST",
      body: JSON.stringify({ recoverCode, newPassword }),
      headers: {
          "Content-Type": "application/json",
      },
    });
        
    const json = await response.json();
    
    if (!response.ok) {
        throw new Error(json.message);
    }
  }

  async function postEntryService ({title, content, category, genre, animeCharacter, token}){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/entry`, {
      method: "POST",
      body: JSON.stringify({title, content, category, genre, animeCharacter}),
      headers: {
          "Content-Type": "application/json",
          auth: token
      },
    });
        
    const json = await response.json();
    
    if (!response.ok) {
        throw new Error(json.message);
    }
  }

  async function editEntryService ({title, content, category, genre, animeCharacter, token, id}){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/edit-entry/${id}`, {
      method: "PUT",
      body: JSON.stringify({title, content, category, genre, animeCharacter}),
      headers: {
          "Content-Type": "application/json",
          auth: token
      },
    });
        
    const json = await response.json();
    
    if (!response.ok) {
        throw new Error(json.message);
    }
  }

async function getUserInfoService (id, token){
  
  const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`,{
    headers: {
      auth: token,
    }
  });
  const json = await res.json();

  if(!res.ok){
      throw new Error(json.message);
  }

  return json.data; 
}

export {getOneEntryService, registerUserService, recoverPasswordService, resetPasswordService, postEntryService, getUserInfoService, editEntryService};

