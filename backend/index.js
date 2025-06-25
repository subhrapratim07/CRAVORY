const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const BookTableModel = require('./models/BookTable');

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

mongoose.connect('mongodb+srv://msubhra364:Subhra07@cluster0.0oq0nx4.mongodb.net/cravory');
// Register

app.post('/register', (req, res) => {
  console.log("request come");
  const { email } = req.body;
  FormDataModel.findOne({ email })
    .then(user => {
      if (user) res.json("Already registered");
      else FormDataModel.create(req.body)
        .then(log_reg_form => res.json(log_reg_form))
        .catch(err => res.json(err));
    });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email })
    .then(user => {
      if (!user) return res.json("No records found!");
      if (user.password === password) res.json("Success");
      else res.json("Wrong password");
    });
});

// Book table
app.post('/book-table', (req, res) => {
  BookTableModel.create(req.body)
    .then(result => res.json({ message: "Booking Successful", data: result }))
    .catch(err => res.status(500).json({ error: "Booking Failed", details: err }));
});

// Fetch user info by email
app.get('/user-info/:email', async (req, res) => {
  try {
    const user = await FormDataModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name, email: user.email, phone: user.phonenumber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(40001, () => console.log("Server listening on locahost:40001"));
