import { useState } from "react";
import { registerUserService } from "../../services";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [error, setError] = useState("");
  const [nick, setNick] = useState("")

  const handleForm = async (e) => {
    e.preventDefault();
    if (pwd1 !== pwd2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUserService({ nick, email, pwd: pwd1 });
      navigate("/validar");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <main>
      <section className="register-page-section">
            <form onSubmit={handleForm}>
            <h2 className="register-page-title">Formulario de registro</h2>
            <fieldset className="register-page-fieldset">
                <label className="register-page-label" htmlFor="nick">Nombre de usuario</label>
                <input className="register-page-input"
                  type="text"
                  id="nick"
                  name="nick"
                  value={nick}
                  maxLength="40"
                  required
                  onChange={(e) => setNick(e.target.value)}
                />
              </fieldset>
              <fieldset className="register-page-fieldset">
                <label className="register-page-label" htmlFor="email">Email</label>
                <input className="register-page-input"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  maxLength="256"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className="register-page-fieldset">
                <label className="register-page-label" htmlFor="pwd1">Contraseña</label>
                <input className="register-page-input"
                  type="password"
                  id="pwd1"
                  name="pwd1"
                  value={pwd1}
                  maxLength="20"
                  required
                  onChange={(e) => setPwd1(e.target.value)}
                />
              </fieldset>
              <fieldset className="register-page-fieldset">
                <label className="register-page-label" htmlFor="pwd2">Repetir contraseña</label>
                <input className="register-page-input"
                  type="password"
                  id="pwd2"
                  name="pwd2"
                  value={pwd2}
                  maxLength="20"
                  required
                  onChange={(e) => setPwd2(e.target.value)}
                />
              </fieldset>
              <div>
                <button className="register-page-btn">Confirmar</button>
              </div>
              {error ? <p>{error}</p> : null}
            </form>
      </section>
    </main>
  );
};
