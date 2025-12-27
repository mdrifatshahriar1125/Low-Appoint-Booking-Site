const mongoose = require('mongoose');

const LawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  availability: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lawyer', LawyerSchema);
