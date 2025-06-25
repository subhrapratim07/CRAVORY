import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const offerCards = [
    {
      id: 1,
      image: "/offer1.png",
      title: "Weekend Special Combo",
      desc: "Enjoy a full meal with drinks and dessert at a special price every weekend!"
    },
    {
      id: 2,
      image: "/offer2.jpeg",
      title: "Butter Chicken Delight",
      desc: "Our signature creamy butter chicken is a customer favorite you must try."
    },
    {
      id: 3,
      image: "/offer3.jpeg",
      title: "Creamy Alfredo Pasta",
      desc: "Rich, creamy, and packed with flavor – a must-have for pasta lovers."
    }
  ];

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
    <>
      <ToastContainer position="top-center" autoClose={3000} />
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

      {/* Hero Section */}
      <div style={{
        backgroundImage: "url('/homebg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), #000)',
          zIndex: 2,
        }} />
        <div className="container d-flex align-items-center" style={{
          minHeight: 'calc(100vh - 80px)',
          paddingTop: '60px',
          position: 'relative',
          zIndex: 3
        }}>
          <div className="row w-100">
            <div className="col-12 col-md-8 col-lg-6 px-4 py-5">
              <h1 className="display-3 fw-bold text-warning lh-sm">WELCOME TO CRAVORY</h1>
              <div className="mt-4 mb-4 text-white fw-bold fs-5 lh-base">
                – a place where every dish is a story of <br />
                passion, flavor, and irresistible cravings.
              </div>
              <p className="text-white m-0 fs-4 fw-semibold">Get fresh foods and other treats</p>
              <h5 className="text-white fs-4 fw-normal">at the convenience of your home.</h5>
              <div className="mt-4 d-flex gap-3 flex-wrap">
                <Link to="/Order" className="btn btn-secondary">ORDER NOW!</Link>
                <Link to="/BookTable" className="btn btn-warning">BOOK TABLE!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div style={{
        backgroundImage: "url('/offerbg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
      }}>
        <div className="container py-5">
          <h2 className="text-center text-light mb-4 fw-bold">What We Offer</h2>
          <div className="row g-4">
            {offerCards.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-lg-4">
                <div
                  className="card h-100 shadow-sm"
                  onClick={() => toast.info(`You clicked: ${item.title}`)}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    cursor: "pointer",
                    transform: hoveredCard === item.id ? "scale(1.05)" : "scale(1)",
                    boxShadow: hoveredCard === item.id
                      ? "0 8px 20px rgba(0,0,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <img src={item.image} className="card-img-top" alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.title}</h5>
                    <p className="card-text">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
