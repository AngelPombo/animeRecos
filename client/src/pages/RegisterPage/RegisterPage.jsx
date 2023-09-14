import { useState } from "react";
import { registerUserService } from "../../services";
import { useNavigate } from "react-router-dom";

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
    <section>
      <h1>Register</h1>
      <form onSubmit={handleForm}>
      <fieldset>
          <label htmlFor="nick">Nombre de usuario</label>
          <input
            type="text"
            id="nick"
            name="nick"
            value={nick}
            required
            onChange={(e) => setNick(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pwd1">Password</label>
          <input
            type="password"
            id="pwd1"
            name="pwd1"
            value={pwd1}
            required
            onChange={(e) => setPwd1(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pwd2">Repeat password</label>
          <input
            type="password"
            id="pwd2"
            name="pwd2"
            value={pwd2}
            required
            onChange={(e) => setPwd2(e.target.value)}
          />
        </fieldset>
        <button>Register</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
