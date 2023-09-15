import { useState, useContext } from "react";
import "./LoginForm.css";
import sessionContext from "../../context/sessionContext";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const navigateTo = useNavigate();
  const { logged, handleLogin } = useContext(sessionContext);
 

  async function handleAuthUser(evt) {
    evt.preventDefault();
  
    const email = evt.target.email.value
    const pwd = evt.target.pwd.value
    const baseUrl = import.meta.env.VITE_API_URL;
   

    const userData = {
      pwd: pwd,
      email: email
    };

    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const jsonData = await response.json();

    console.log(jsonData)

    if (response.ok) {
      handleLogin({
        email: jsonData.data.email,
        token: jsonData.data.token
      });
      navigateTo("/")
    } else setFeedbackMsg("Error al autenticarte");
  }

  if (logged) return <h2>{feedbackMsg}</h2>;

  return (
    <>
      <form onSubmit={handleAuthUser}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Nombre de usuario"
          ></input>
        </label>

        <label>
          Contraseña
          <input
            type="password"
            name="pwd"
            placeholder="**"
          ></input>
        </label>

        <button type="submit">Login</button>
        <button type="reset">Cancelar</button>
        {feedbackMsg ? <small>{feedbackMsg}</small> : <></>}
      </form>
      <Link to='/recuperar-password'>¿Has olvidado tu contraseña?</Link>
      <p>¿Todavía no tienes cuenta?</p>
      <Link to="/registro">Regístrate aquí</Link>
    </>
  );
}

export default LoginForm;