import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import '../styles/Bookings.css';

const Bookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    document.title = 'Bookings - LegalEase';
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAppointments(appointments.filter(app => app._id !== appointmentId));
        toast.success('Appointment cancelled');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  // Prepare chart data
  const chartData = appointments.map(apt => ({
    name: apt.lawyerName,
    fee: apt.lawyerFee
  }));

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>

      {loading ? (
        <div className="loading">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="no-appointments">
          <h2>No Appointments Booked Yet</h2>
          <p>You haven't booked any appointments. Start exploring our lawyers!</p>
          <button className="back-home-btn" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      ) : (
        <>
          {/* Chart Section */}
          <div className="chart-section">
            <h2>Appointment Fees Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="fee" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Appointments List */}
          <div className="appointments-list">
            {appointments.map(appointment => (
              <div key={appointment._id} className="appointment-item">
                <div className="appointment-details">
                  <h3>{appointment.lawyerName}</h3>
                  <p><strong>Speciality:</strong> {appointment.speciality}</p>
                  <p><strong>Consultation Fee:</strong> ${appointment.lawyerFee}</p>
                  <p><strong>Booked on:</strong> {new Date(appointment.createdAt).toLocaleDateString()}</p>
                </div>
                <button 
                  className="cancel-btn"
                  onClick={() => handleCancelAppointment(appointment._id)}
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookings;
