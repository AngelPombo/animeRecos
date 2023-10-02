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

async function postCommentService (id, token, content){
  
const response = await fetch (`${import.meta.env.VITE_API_URL}/entry/${id}/comments`,{
  method: "POST",
  body: JSON.stringify({comment: content}),
  headers:{
    "Content-Type": "application/json",
    auth: token
  },
});

const json = await response.json();

if (!response.ok){
  throw new Error (json.message);
}
  return json.data;

}

  async function addPhotoService(token, entry_id, formData){

    const response = await fetch(`${import.meta.env.VITE_API_URL}/entries/${entry_id}/photos`,{
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

  }

  async function editEntryService (formData, token, id){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/edit-entry/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
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

async function newUserProfile (id, data, token){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/edit-profile/${id}`,{
    method: "PUT",
    body: data,
    headers:{
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

async function editCommentService(idEntry, idComment, comment, token){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/entry/${idEntry}/edit-comment/${idComment}`,{
    method: "PUT",
    body: JSON.stringify({comment: comment}),
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

async function deleteCommentService(idEntry, idComment, token){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/entry/${idEntry}/delete-comment/${idComment}`,{
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

async function deletePhotoService(idEntry, idPhoto, token){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/entries/${idEntry}/photos/${idPhoto}`,{
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

async function voteEntryService(idEntry, idUser, token){
  const response = await fetch(`${import.meta.env.VITE_API_URL}/entries/${idEntry}/votes`,{
    method: "POST",
    headers: {
      auth: token
    },

  });
  const json = await response.json();
  
  if (!response.ok) {
      throw new Error(json.message);
  }
}

export {getOneEntryService, registerUserService, recoverPasswordService, resetPasswordService, postEntryService, postCommentService, getUserInfoService, editEntryService, addPhotoService, newUserProfile, changePwdService, deleteUserService, editCommentService, deleteCommentService, deletePhotoService, voteEntryService};

