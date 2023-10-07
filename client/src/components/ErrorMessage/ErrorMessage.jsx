import { Link } from "react-router-dom";
import facepalm from "/facepalm.png"

export const ErrorMessage = ({ message }) => {
  return (
    <section className="error">
      <h2>Ooops! ha ocurrido un error.</h2>
      <img src={facepalm} alt="Error" />
      <p>{message}</p>
      <Link to={"/"}>Volver a página de inicio</Link>
    </section>
  );
};
