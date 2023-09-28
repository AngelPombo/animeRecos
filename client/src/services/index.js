import { json } from "react-router-dom";

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

  async function postEntryService (formData, token){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/entry`, {
      method: "POST",
      body: formData,
      headers: {
          
          auth: token
      },
    });
        
    const json = await response.json();

    
    if (!response.ok) {
        throw new Error(json.message);
    }
        return json.data;
  }

async function postCommentService ({id, token, content}){
  console.log(id)
const response = await fetch (`${import.meta.env.VITE_API_URL}/entry/${id}/comments`,{
  method: "POST",
  body: JSON.stringify({content}),
  headers:{
    "Content-Type": "application/json",
    auth: token
  },
});
const json = await response.json();
if (!response.ok){
  throw new Error (json.message);
}
  return  json;

}




  async function addPhotoService({token, entry_id, formData}){
    
    
    for (const value of formData.values()) {
      console.log(value);
    } 

    const response = await fetch(`${import.meta.env.VITE_API_URL}/entries/${entry_id}/photos`,{
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
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

async function newUserProfile ({id, token, email,  nick, bio, linkTwitter, linkYoutube, linkInsta, linkTtv, avatar}){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/edit-profile/${id}`,{
    method: "PUT",
    body: JSON.stringify({email,  nick, bio, linkTwitter, linkYoutube, linkInsta, linkTtv, avatar}),
    headers:{
      "Content-Type": "application/json",
      auth: token,
    }
  });

  const json = await res.json();

  if(!res.ok){
    throw new Error(json.message);
  }

  return json;
}

async function changePwdService(oldPwd, newPwd, token, id){

  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}/password`, {
    method: "PUT",
    body: JSON.stringify({oldPwd, newPwd}),
    headers:{
      "Content-Type": "application/json",
      auth: token,
    }
  });

  const json = await res.json();

  if(!res.ok){
    throw new Error(json.message);
  }

  return json;
}

async function deleteUserService(id, token){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`,{
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
      auth: token,
    }
  });

  const json = await res.json();

  if(!res.ok){
    throw new Error(json.message);
  }

  return json;
}

export {getOneEntryService, registerUserService, recoverPasswordService, resetPasswordService, postEntryService, postCommentService, getUserInfoService, editEntryService, addPhotoService, newUserProfile, changePwdService, deleteUserService};

