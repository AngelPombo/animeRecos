import { createContext, useState, useEffect } from "react";

// Contexto inicial (valor por defecto)
const sessionContext = createContext({
  logged: false,
  name: "anónimo",
});

// ContextProvider Personalizado
function SessionProvider(props) {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("anónimo");

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      setLogged(true);
      setUsername(window.localStorage.getItem("email"));
    }
  }, []);

  function handleLogin({ auth, email, token }) {
    window.localStorage.setItem("jwt", token);
    window.localStorage.setItem("email", email);
    setLogged(auth);
    setUsername(email);
  }

  function handleLogout() {
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("email");
    setLogged(false);
    setUsername("Anónimo");
  }

  return (
    <sessionContext.Provider value={{ logged, handleLogin, handleLogout, username }}>
      {props.children}
    </sessionContext.Provider>
  );
}

export { SessionProvider };

export default sessionContext;
