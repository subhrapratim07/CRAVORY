// About.js
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
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
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Navbar */}
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

      {/* About Content */}
   <div className="container py-5 text-center">
  <h1 className="mb-4 display-1 fw-semibold text-dark" style={{ fontFamily:"cursive"}}>
    Who Are We?
  </h1>
  <p className="fs-4 text-secondary mx-auto" style={{ maxWidth: '900px', lineHeight: '1.8' }}>
    Welcome to Cravory, where passion meets flavor in every bite. We take pride in offering a 
    delightful dining experience through both our cozy offline restaurant and convenient online ordering service. 
    Whether you’re enjoying a meal in our inviting ambiance or savoring it at home, we bring the same care and quality to every dish.

At Cravory, our menu celebrates the richness of multicuisine offerings — from aromatic Indian spices to 
continental classics and Asian favorites. Our chefs craft each dish with authenticity and creativity to satisfy 
every palate. We’re committed to delivering not just food, but a flavorful journey for our guests — anytime, anywhere.
  </p>
</div>


    </div>
  );
};

export default About;
