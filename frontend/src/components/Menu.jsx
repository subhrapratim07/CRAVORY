import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure carousel works

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
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    toast.success("Logged out successfully!");
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: "gray", overflowX: 'hidden' }}>
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
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
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

      {/* Carousel */}
      <div id="aboutCarousel" className="carousel slide container my-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#aboutCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#aboutCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#aboutCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner text-center">
          <div className="carousel-item active">
            <img className="d-block mx-auto w-50 img-fluid" src="offer1.png" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img className="d-block mx-auto w-50 img-fluid" src="offer2.jpeg" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img className="d-block mx-auto w-50 img-fluid" src="offer3.jpeg" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#aboutCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#aboutCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default About;
