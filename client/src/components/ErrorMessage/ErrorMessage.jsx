import { Link } from "react-router-dom";

export const ErrorMessage = ({ message }) => {
  return (
    <section className="error">
      <h2>Ooops! ha ocurrido un error.</h2>
      <img src="https://www.pngitem.com/pimgs/m/497-4972851_view-samegoogleiqdbsaucenao-tumblr-movybhmi6z1roi9fwo1-facepalm-anime-girl-png.png" alt="Error" />
      <p>{message}</p>
      <Link to={"/"}>Volver a página de inicio</Link>
    </section>
  );
};
