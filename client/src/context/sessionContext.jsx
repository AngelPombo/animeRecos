import { createContext, useState, useEffect } from "react";

// Contexto inicial (valor por defecto)
const sessionContext = createContext({
  logged: false,
  name: "anónimo",
  id: "",
});

// ContextProvider Personalizado
function SessionProvider(props) {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("anónimo");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      setLogged(true);
      setUsername(window.localStorage.getItem("email"));
      setUserId(window.localStorage.getItem("id"));
    }
  }, []);

  function handleLogin({ auth, email, token, id }) {
    window.localStorage.setItem("jwt", token);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("id", id);
    setLogged(auth);
    setUsername(email);
    setUserId(id);
  }

  function handleLogout() {
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("id");
    setLogged(false);
    setUsername("Anónimo");
    setUserId("");
  }

  return (
    <sessionContext.Provider value={{ logged, handleLogin, handleLogout, username, userId }}>
      {props.children}
    </sessionContext.Provider>
  );
}

export { SessionProvider };

export default sessionContext;
