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
import { NotFound } from './components/NotFound/Notfound';
import { RecoverPasswordPage } from './pages/RecoverPasswordPage/RecoverPasswordPage';
import { NewPasswordWithCode } from './pages/NewPasswordWithCode/NewPasswordWithCode';
import { PostEntryPage } from './pages/PostEntryPage/PostEntryPage';
import { EditEntryPage } from './pages/EditEntryPage/EditEntryPage';
import { UserPage } from './pages/UserPage/UserPage';
import { EditProfileForm } from './components/EditProfileForm/EditProfileForm';
import { ChangePasswordPage } from './pages/ChangePasswordPage/ChangePasswordPage';
import { DeleteUserPage } from './pages/DeleteUserPage/DeleteUserPage';


function App() {

  return (
      <div className="app">
          <Header />
          <main>
            <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/registro" element={<RegisterPage/>} />
                  <Route path='/validar' element= {<RegisterValidate/>}/>
                  <Route path="/login" element={<LoginForm/>} />
                  <Route path='/editar-perfil/:id' element= {<EditProfileForm/>}/>
                  <Route path='/perfil-usuario/:id' element={<UserPage/>}/> 
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
                  <Route path='/crear-entrada' element= {<PostEntryPage/>}/>
                  <Route path='/recuperar-password' element= {<RecoverPasswordPage />} />
                  <Route path='/nueva-password' element={<NewPasswordWithCode/>}/>
                  <Route path='/cambiar-password/:id' element={<ChangePasswordPage/>}/>
                  <Route path='/users/:id' element={<DeleteUserPage/>} />
                  <Route path="*" element={<NotFound/>} />
            </Routes> 
          </main>
          <Footer />
      </div>
  );
}

export default App;
