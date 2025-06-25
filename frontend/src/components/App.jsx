import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import About from './About';
import Contact from './Contact';
import BookTable from './BookTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* ✅ Main route in lowercase */}
        <Route path="/book-table" element={<BookTable />} />
        {/* 🔁 Optional redirect from old uppercase route */}
        <Route path="/BookTable" element={<Navigate to="/book-table" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
