import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../components/auth/context/auth';

function Header() {
  const[auth, setAuth] = useAuth();
  const navigate = useNavigate();
  // console.log("authafd"+auth);
  function handleLogout(){
    setAuth({
      ...auth,
      user:null,
      token:""
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully",{
      autoClose:1500
    })
    navigate("/home") 
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={{backgroundColor:"#87a591"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Fa-jin</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active " aria-current="page" to="/">Home</Link>
        </li>
        {
          auth.user 
          ? 
        <li className="nav-item">
          <Link className="nav-link" to="/logout" onClick={handleLogout}>Logout</Link>
        </li>
          : 
          <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
          </>
        }
        
        {/* <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="#">Action</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li> */}
       
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search"  />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header