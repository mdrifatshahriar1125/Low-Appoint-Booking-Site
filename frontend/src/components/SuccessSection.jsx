import React from 'react';
import CountUp from 'react-countup';
import '../styles/SuccessSection.css';

const SuccessSection = () => {
  const stats = [
    { icon: '👨‍⚖️', number: 150, title: 'Expert Lawyers' },
    { icon: '📅', number: 5000, title: 'Appointments Booked' },
    { icon: '😊', number: 8500, title: 'Happy Clients' },
    { icon: '🏆', number: 25, title: 'Years Experience' }
  ];

  return (
    <section className="success-section">
      <h2>Why Choose LegalEase?</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">
              <CountUp end={stat.number} duration={2.75} />
              <span>+</span>
            </div>
            <div className="stat-title">{stat.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessSection;
