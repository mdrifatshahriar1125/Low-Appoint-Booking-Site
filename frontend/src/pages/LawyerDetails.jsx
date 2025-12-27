import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';
import '../styles/LawyerDetails.css';

const LawyerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLawyerDetails = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/lawyers/${id}`);
      if (!response.ok) {
        throw new Error('Lawyer not found');
      }
      const data = await response.json();
      setLawyer(data);
    } catch (error) {
      console.error('Error fetching lawyer details:', error);
      navigate('/404');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchLawyerDetails();
  }, [fetchLawyerDetails]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!lawyer) {
    return <div className="error">Lawyer not found</div>;
  }

  return (
    <div className="lawyer-details-page">
      <div className="lawyer-profile-card">
        <h2>Lawyer's Profile Details</h2>
        <p className="slogan">Expert Legal Guidance at Your Service</p>

        <div className="profile-content">
          <div className="profile-image">
            <img src={lawyer.image} alt={lawyer.name} />
          </div>

          <div className="profile-info">
            <h1>{lawyer.name}</h1>
            <div className="info-grid">
              <div className="info-item">
                <label>Speciality:</label>
                <p>{lawyer.speciality}</p>
              </div>
              <div className="info-item">
                <label>Experience:</label>
                <p>{lawyer.experience} Years</p>
              </div>
              <div className="info-item">
                <label>License Number:</label>
                <p>{lawyer.licenseNumber}</p>
              </div>
              <div className="info-item">
                <label>Consultation Fee:</label>
                <p>${lawyer.fee}</p>
              </div>
            </div>

            <div className="availability-section">
              <h3>Availability</h3>
              <div className="availability-days">
                {lawyer.availability && lawyer.availability.map((day, index) => (
                  <span key={index} className="day-badge">{day}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentCard lawyer={lawyer} />
    </div>
  );
};

export default LawyerDetails;
