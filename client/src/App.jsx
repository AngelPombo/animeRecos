//---Importamos los componentes
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
 import {Route, Routes} from 'react-router-dom'; 

//---Importamos las páginas
import {HomePage} from './pages/HomePage/HomePage';


function App() {

  return (
      <div className="app">
          <Header />
          <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/registro" element={<p>pagina de registro</p>} />
                <Route path="/login" element={<p>pagina de logeo</p>} />
                <Route path='/editar-perfil/:idUser' element= {<p>pagina editar perfil</p>}/>
                <Route path='/perfil/:idUser' element= {<p>pagina  perfil usuario</p>}/> 
                <Route path='/fanart'element={<p>fanart</p>}/>
                <Route path='/memes'element={<p>memes</p>}/>
                <Route path='/teorias'element={<p>teorias</p>}/>
                <Route path='/cosplays'element={<p>cosplay</p>}/>
                <Route path='/openings'element={<p>openings</p>}/>
                <Route path='/recos'element={<p>recomendaciones</p>}/>
                <Route path='/novedades' element={<p>last entries</p>}/>
                <Route path='/terminos-condiciones-uso'element= {<p>terminos</p>}/>
                <Route path='/entrada/:idEntry' element= {<p>get one entry</p>}/>
                <Route path='/crear-entrada' element= {<p>crear entrada</p>}/> 
                <Route path="*" element={<p>not found</p>} />

          </Routes> 
          <Footer />
      </div>
  );
}

export default App;
