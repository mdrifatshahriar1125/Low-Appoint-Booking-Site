import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/AppointmentCard.css';

const AppointmentCard = ({ lawyer }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBookNow = async () => {
    setLoading(true);
    try {
      const appointmentData = {
        lawyerId: lawyer._id,
        lawyerName: lawyer.name,
        lawyerFee: lawyer.fee,
        speciality: lawyer.speciality,
        appointmentDate: new Date(),
        userEmail: localStorage.getItem('userEmail') || 'user@example.com',
        userName: localStorage.getItem('userName') || 'User'
      };

      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        toast.success(`Appointment booked with ${lawyer.name}`);
        navigate('/bookings');
      } else {
        toast.error('Failed to book appointment');
      }
    } catch (error) {
      toast.error('Error booking appointment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-badge">Available</div>
      <h3>Book an Appointment</h3>
      <p>Schedule a consultation with {lawyer.name}</p>
      <button 
        className="book-now-btn" 
        onClick={handleBookNow}
        disabled={loading}
      >
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
  );
};

export default AppointmentCard;
