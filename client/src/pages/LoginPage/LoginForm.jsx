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

    if (response.ok) {
      handleLogin({
        email: jsonData.data.email,
        token: jsonData.data.token,
        id: jsonData.info.id,
        auth: true,
        timestamp: new Date().getTime(),
      });
      navigateTo("/")
    } else setFeedbackMsg("Usuario y/o contraseña incorrectas");
  }

  if (logged) return <h2 className="feedback-msg">{feedbackMsg}</h2>;

  return (
      <div className="login-main-div">
        <form className="login-form" onSubmit={handleAuthUser}>
          <div className="label-input-div">
            <label className="login-form-label" htmlFor="email">
              Email
            </label>
            <input className="login-form-input"
                type="email"
                name="email"
                placeholder="Nombre de usuario..."
                maxLength="256"
            ></input>
          </div>
          <div className="label-input-div">
            <label className="login-form-label">
              Contraseña   
            </label>
            <input className="login-form-input"
                type="password"
                name="pwd"
                placeholder="Introduce tu contraseña..."
                maxLength="20"
            ></input>
            <small><Link to='/recuperar-password' className="recuperar-password-hover">¿Has olvidado tu contraseña?</Link></small>
          </div>
          <div className="div-buttons">
            <button className="login-btn" type="submit">Iniciar sesión</button>
            {feedbackMsg ? <small className="feedback-msg">{feedbackMsg}</small> : <></>}
          </div>
        </form>
        <div className="register-div">
          <p>¿Todavía no tienes cuenta?</p>
          <Link to="/registro" className="recuperar-password-hover">Regístrate aquí</Link>
        </div>
      </div>
  );
}

export default LoginForm;