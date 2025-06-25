const mongoose = require('mongoose');
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phonenumber: String,
  password: String
});
module.exports = mongoose.model('log_reg_form', FormDataSchema);


