//---Importamos los componentes
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import {Route, Routes} from 'react-router-dom'; 

//---Importamos las páginas
import {HomePage} from './pages/HomePage/HomePage';
import {NovedadesPage} from './pages/NovedadesPage/NovedadesPage';
import { SelectGenrePage } from './pages/SelectGenrePage/SelectGenrePage';
import { FilterCategoriesByGenre } from './pages/FilterCategoriesByGenre/FilterCategoriesByGenre';
import { TermsAndConditions } from './components/TermsAndConditions/TermsAndConditions';
import { OneEntryPage } from './pages/OneEntryPage/OneEntryPage';
import LoginForm from './pages/LoginPage/LoginForm';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { RegisterValidate } from './components/RegisterValidate/RegisterValidate';


function App() {

  return (
      <div className="app">
          <Header />
          <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/registro" element={<RegisterPage/>} />
                <Route path='/validar' element= {<RegisterValidate/>}/>
                <Route path="/login" element={<LoginForm/>} />
                <Route path='/editar-perfil/:idUser' element= {<p>pagina editar perfil</p>}/>
                <Route path='/perfil/:idUser' element= {<p>pagina  perfil usuario</p>}/> 
                <Route path='/fanart'element={<SelectGenrePage category="fanart"/>}/>
                <Route path='/memes'element={<SelectGenrePage category="memes"/>}/>
                <Route path='/teorias'element={<SelectGenrePage category="teorias"/>}/>
                <Route path='/cosplays'element={<SelectGenrePage category="cosplays"/>}/>
                <Route path='/openings'element={<SelectGenrePage category="openings"/>}/>
                <Route path='/recos'element={<SelectGenrePage category="recomendaciones"/>}/>
                <Route path='/novedades' element={<NovedadesPage />}/>
                <Route path='/:category/:genre' element={<FilterCategoriesByGenre/>}/>
                <Route path='/terminos-condiciones-uso'element= {<TermsAndConditions/>}/>
                <Route path='/entrada/:idEntry' element= {<OneEntryPage/>}/>
                <Route path='/crear-entrada' element= {<p>crear entrada</p>}/> 
                <Route path="*" element={<p>not found</p>} />

          </Routes> 
          <Footer />
      </div>
  );
}

export default App;
