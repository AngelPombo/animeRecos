//---Importamos los componentes
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
/* import {Route, Routes} from 'react-router-dom'; */

//---Importamos las páginas
import {HomePage} from './pages/HomePage/HomePage';


function App() {

  return (
      <div className="app">
          <Header />
          <HomePage />
{/*           <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
          </Routes> */}
          <Footer />
      </div>
  );
}

export default App;
