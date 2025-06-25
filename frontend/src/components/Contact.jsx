// Contact.js
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
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
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
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

      {/* Contact Content */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-muted text-center mb-4">Have a question or feedback? We'd love to hear from you!</p>
        <form className="mx-auto" style={{ maxWidth: '500px' }}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input type="text" className="form-control" placeholder="Your Name" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control" placeholder="Your Email" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea className="form-control" rows="4" placeholder="Your Message" required></textarea>
          </div>
          <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-danger w-50">Send Message</button>
                  <Link to="/Home" className="btn btn-warning w-50">Home</Link>
                </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
