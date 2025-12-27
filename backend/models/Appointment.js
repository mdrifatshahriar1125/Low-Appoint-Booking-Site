const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer',
    required: true
  },
  lawyerName: {
    type: String,
    required: true
  },
  lawyerFee: {
    type: Number,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
