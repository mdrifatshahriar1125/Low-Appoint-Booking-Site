import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LawyerCard.css';

const LawyerCard = ({ lawyer }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/lawyer/${lawyer._id}`);
  };

  return (
    <div className="lawyer-card">
      <img src={lawyer.image} alt={lawyer.name} className="lawyer-image" />
      <div className="lawyer-info">
        <h3>{lawyer.name}</h3>
        <p className="speciality">
          <span className="badge">{lawyer.speciality}</span>
        </p>
        <p><strong>Experience:</strong> {lawyer.experience} years</p>
        <p><strong>License:</strong> {lawyer.licenseNumber}</p>
        <p><strong>Fee:</strong> ${lawyer.fee}</p>
        <button className="view-details-btn" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default LawyerCard;
