import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as QRCode from "qrcode";
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

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

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
      setTimeout(() => navigate('/Login'), 3000);
      return;
    }

    axios.get(`http://localhost:40001/user-info/${userEmail}`)
      .then(res => setFormData(prev => ({ ...prev, ...res.data })))
      .catch(() => {
        localStorage.removeItem('userEmail');
        navigate('/home', { state: { toast: "Session expired. Please login again." } });
      });
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save before resetting
    const snapshot = { ...formData };

    axios.post('http://localhost:40001/book-table', formData)
      .then(res => {
        toast.success(res.data.message || "Booking Successful!");
        
        setBookingSuccess(true);
        setReceiptData(snapshot); // Save to use for slip

        setFormData(prev => ({
          ...prev,
          guests: '',
          date: '',
          time: '',
        }));
      })
      .catch(() => toast.error('Booking failed.'));
  };

  const handleDownloadSlip = async () => {
  if (!receiptData) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [80, 200], // Narrow receipt style
  });

  const now = new Date();
  const timestamp = now.toLocaleString('en-GB');

  // Load logo image
  const logoImg = new Image();
  logoImg.src = '/logo.png'; // Make sure logo.png is in /public folder
  await new Promise((resolve) => {
    logoImg.onload = resolve;
  });

  doc.addImage(logoImg, 'PNG', 30, 5, 20, 20); // Centered Logo

  doc.setFontSize(14);
  doc.text('CRAVORY RESTAURANT', 40, 30, { align: 'center' });

  doc.setFontSize(10);
  doc.text('******************************', 40, 36, { align: 'center' });
  doc.text('RECEIPT', 40, 42, { align: 'center' });
  doc.text('******************************', 40, 48, { align: 'center' });

  doc.setFontSize(9);
  doc.text('Terminal', 10, 54);
  doc.text(timestamp, 10, 60);

  doc.text('______________________________', 40, 65, { align: 'center' });

  const fields = [
    ['Name', receiptData.name],
    ['Email', receiptData.email],
    ['Phone', receiptData.phone],
    ['Date', receiptData.date],
    ['Time', receiptData.time],
    ['Guests', receiptData.guests],
  ];

  let y = 72;
  fields.forEach(([label, value]) => {
    doc.text(`${label}:`, 10, y);
    doc.text(`${value}`, 70, y, { align: 'right' });
    y += 6;
  });

  doc.text('______________________________', 40, y + 3, { align: 'center' });

  // QR Code
  y += 12;
  doc.setFontSize(10);
  doc.text('QR for confirmation', 40, y, { align: 'center' });

  const qrText = `Booking for ${receiptData.name} on ${receiptData.date} at ${receiptData.time}`;
  const qrData = await QRCode.toDataURL(qrText);
  doc.addImage(qrData, 'PNG', 25, y + 5, 30, 30); // Center QR

  // Thank you message
  doc.setFontSize(12);
  doc.text('********** THANK YOU! **********', 40, y + 42, { align: 'center' });

  doc.save('CRAVORY RESTAURANT-booking-slip.pdf');
  setTimeout(() => navigate('/Home'), 4000);
};



  const getNextFiveDates = () => {
    const dates = [];
    const options = { weekday: 'short', day: 'numeric' };
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        label: date.toLocaleDateString('en-US', options),
        value: date.toISOString().split('T')[0],
      });
    }
    return dates;
  };

  const getTimeSlots = () => {
    const slots = [];
    const start = new Date();
    start.setHours(14, 0, 0, 0); // 12:00 PM
    for (let i = 0; i < 17; i++) {
      const slot = new Date(start.getTime() + i * 30 * 60000);
      const timeStr = slot.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      slots.push(timeStr);
    }
    return slots;
  };

  const availableDates = getNextFiveDates();
  const timeSlots = getTimeSlots();

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" autoClose={3000} />
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

            {/* Guest Dropdown */}
            <select
              className="form-control mb-3"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              <option value="">Select Guests</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Guest{i > 0 ? 's' : ''}
                </option>
              ))}
            </select>

            {/* Date Buttons */}
            <h6>Select Date</h6>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {availableDates.map((d, i) => (
                <button
                  type="button"
                  key={i}
                  className={`btn btn-outline-secondary ${formData.date === d.value ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, date: d.value })}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <h6>Select Time Slot</h6>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {timeSlots.map((slot, i) => (
                <button
                  type="button"
                  key={i}
                  className={`btn btn-outline-dark ${formData.time === slot ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, time: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-danger w-50">Book Table</button>
              <Link to="/Home" className="btn btn-warning w-50">Home</Link>
            </div>
          </form>

          {/* Download Button */}
          {bookingSuccess && (
            <div className="text-center mt-4">
              <button className="btn btn-success" onClick={handleDownloadSlip}>
                
                Download Booking Slip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTable;
