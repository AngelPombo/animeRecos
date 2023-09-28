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
  const [timeStamp, setTimeStamp] = useState(0);
  const oneDayMs = 86400000;

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token && (new Date().getTime() < (timeStamp + oneDayMs))) {
      setLogged(true);
      setUsername(window.localStorage.getItem("email"));
      setUserId(window.localStorage.getItem("id"));
      setTimeStamp(window.localStorage.getItem("timestamp"))
    }else{
      setTimeStamp(0);
      setLogged(false);
      setUsername("Anónimo");
      setUserId("");
      window.localStorage.removeItem("jwt");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("id");
      window.localStorage.removeItem("timestamp");
    }
  }, []);

  function handleLogin({ auth, email, token, id, timestamp }) {
    window.localStorage.setItem("jwt", token);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("id", id);
    window.localStorage.setItem("timestamp", timestamp);
    setTimeStamp(timestamp);
    setLogged(auth);
    setUsername(email);
    setUserId(id);
  }

  function handleLogout() {
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("timestamp");
    setTimeStamp(null);
    setLogged(false);
    setUsername("Anónimo");
    setUserId("");
  }

  return (
    <sessionContext.Provider value={{ logged, handleLogin, handleLogout, username, userId, timeStamp, oneDayMs}}>
      {props.children}
    </sessionContext.Provider>
  );
}

export { SessionProvider };

export default sessionContext;
