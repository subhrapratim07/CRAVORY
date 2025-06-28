// Contact.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
import Footer from './Footer';

const Contact = () => {
  
  return (
    <>
    <Nav/>
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>

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
    <Footer/>
    </>
  );
};

export default Contact;
