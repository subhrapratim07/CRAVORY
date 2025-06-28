import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = () =>{
     const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    setIsLoggedIn(!!userEmail);
  }, []);

  useEffect(() => {
    if (location.state?.toast) {
      toast.info(location.state.toast);
      window.history.replaceState({}, document.title); // Clear state to prevent repeat toast
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    toast.success("Logged out successfully!");
    setIsLoggedIn(false);
    navigate('/login');
  };

  return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/logo.png" alt="Logo" height="45" />
            <span className="fw-bold fs-4">CRAVORY</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item me-3"><Link className="nav-link fs-5" to="/">Home</Link></li>
              <li className="nav-item me-3"><Link className="nav-link fs-5" to="/Menu">Menu</Link></li>
              <li className="nav-item me-3"><Link className="nav-link fs-5" to="/About">About</Link></li>
              <li className="nav-item"><Link className="nav-link fs-5" to="/Contact">Contact</Link></li>
            </ul>
            <div className="d-flex gap-2">
              {!isLoggedIn ? (
                <>
                  <Link to="/register" className="btn btn-danger">Register</Link>
                  <Link to="/login" className="btn btn-warning">Login</Link>
                </>
              ) : (
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              )}
            </div>
          </div>
        </div>
      </nav>

  );
};
export default Nav;