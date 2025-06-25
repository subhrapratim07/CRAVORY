import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '',
    date: '',
    time: '',
  });

  // Show toast passed via route state
  useEffect(() => {
    if (location.state?.toast) {
      toast.warning(location.state.toast);
    }
  }, [location.state]);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/home', { state: { toast: "Please login to book a table." } });
      return;
    }

    axios
      .get(`http://localhost:40001/user-info/${userEmail}`)
      .then((res) => {
        setFormData((prev) => ({ ...prev, ...res.data }));
      })
      .catch(() => {
        localStorage.removeItem('userEmail');
        navigate('/home', { state: { toast: "Session expired. Please login again." } });
      });
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:40001/book-table', formData)
      .then((res) => {
        toast.success(res.data.message || "Booking Successful!");
        setFormData((prev) => ({
          ...prev,
          guests: '',
          date: '',
          time: '',
        }));
      })
      .catch(() => toast.error('Booking failed.'));
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" autoClose={3000} />{/* Toast Container here */}
      <h2 className="text-center mb-4">Book a Table</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              name="name"
              value={formData.name}
              readOnly
            />
            <input
              type="email"
              className="form-control mb-3"
              name="email"
              value={formData.email}
              readOnly
            />
            <input
              type="tel"
              className="form-control mb-3"
              name="phone"
              value={formData.phone}
              readOnly
            />
            <input
              type="number"
              className="form-control mb-3"
              name="guests"
              placeholder="Guests"
              value={formData.guests}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              className="form-control mb-3"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              className="form-control mb-3"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-danger w-50">
                Book Table
              </button>
              <Link to="/Home" className="btn btn-warning w-50">
                Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
