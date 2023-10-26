import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Logout from './components/auth/Logout';
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
import PageNotFound from './components/PageNotFound';
import { useAuth } from './components/auth/context/auth';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';

function App() {
  const [auth] = useAuth();
  // console.log(auth.user);
  //  auth.user?
  //   console.log("auth user", auth.user)
  // :
  //   console.log("none data");
  
   
  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/home' element={<Home />}/>
              <Route path='/create' element={<CreateNote/>}/>
              <Route path='/update' element={<UpdateNote/>}/>
              <Route path='*' element={<PageNotFound />} ></Route>
          </Routes> 
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
