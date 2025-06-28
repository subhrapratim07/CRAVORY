import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub, FaYoutube, FaGooglePay, FaCcPaypal } from "react-icons/fa";
import { SiPhonepe, SiPaytm } from "react-icons/si";
import { PiQrCodeFill } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* Brand Intro */}
          <div className="col-md-4 text-center text-md-start">
            <h4 className="fw-bold">CRAVORY</h4>
            <p className="small">
              Your go-to destination for delicious meals and delightful experiences. 
              Dine in or order online from our multi-cuisine menu crafted with passion.
            </p>
            <p className="small fw-bold mb-1">Follow Us on Social Media</p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start fs-5">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaLinkedin /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaInstagram /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaGithub /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaYoutube /></a>
            </div>
            <div className="row justify-content-between align-items-center text-center text-md-start mt-5">
          <div className="col-md-8 mb-3 mb-md-0">
            <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-md-start fs-4">
              <span>🔒 Secure Payments:</span>
              <FaGooglePay />
              <SiPhonepe />
              <SiPaytm />
              <FaCcPaypal />
              <PiQrCodeFill />
            </div>
          </div>
        
        </div>

          </div>

          {/* Useful Links */}
          {/* Useful Links */}
<div className="col-md-4 text-center text-md-start">
  <div className="row">
    <div className="col-6">
      <h6 className="fw-bold">Quick Links</h6>
      <ul className="list-unstyled small">
        <li><Link to="/About" className="text-light text-decoration-none">About Us</Link></li>
        <li><Link to="/Menu" className="text-light text-decoration-none">Our Menu</Link></li>
        <li><Link to="/BookTable" className="text-light text-decoration-none">Book a Table</Link></li>
        <li><Link to="/Order" className="text-light text-decoration-none">Order Online</Link></li>
        <li><Link to="/Contact" className="text-light text-decoration-none">Contact Us</Link></li>
      </ul>
    </div>
    <div className="col-6">
      <h6 className="fw-bold">Customer Area</h6>
      <ul className="list-unstyled small">
        <li><Link to="/login" className="text-light text-decoration-none">Login / Signup</Link></li>
        <li><Link to="/orders" className="text-light text-decoration-none">My Orders</Link></li>
        <li><Link to="/track" className="text-light text-decoration-none">Track Order</Link></li>
        <li><Link to="/feedback" className="text-light text-decoration-none">Feedback</Link></li>
        <li><Link to="/admin" className="text-light text-decoration-none">Admin Panel</Link></li>
      </ul>
    </div>
  </div>

  {/* ✅ Images below links */}
  <div className="mt-4 d-flex gap-5 flex-wrap justify-content-center justify-content-md-start">
    <img  src="/logo.png" alt="Cravory Logo" height="120" />
    <img  src="/qr.png" alt="QR Code" height="120" />
  </div>
</div>


          {/* Contact & Map */}
          <div className="col-md-4 text-center text-md-start">
            <h6 className="fw-bold">Visit Us</h6>
            <p className="small mb-1">Acharya Prafulla Chandra Roy Shiksha Prangan, Kolkata – 700016</p>
            <p className="small mb-1">📞 +91 7407764192</p>
            <p className="small mb-1">✉️ support@cravory.com</p>
            <p className="small mb-3">🕒 Open: Mon–Sun, 2 PM – 10 PM</p>

            <div className="ratio ratio-4x3 rounded overflow-hidden border border-light" style={{ height: '180px' }}>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29254.325219761766!2d88.39060350810196!3d22.570799404783468!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275cc7c13fb17%3A0x6e7fa4854f0740ae!2sAcharya%20Prafulla%20Chandra%20Roy%20Shiksha%20Prangan!5e1!3m2!1sen!2sin!4v1750872927193!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <hr className="border-light my-4" />

        {/* Bottom Row: Payment Icons + Logo */}
        
        {/* Copyright */}
        <div className="text-center mt-3 small">
          © 2024 <strong>CRAVORY</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
