const Appointment = require('../models/Appointment');

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
