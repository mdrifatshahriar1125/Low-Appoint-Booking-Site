import React, { useState, useEffect } from 'react';
import LawyerCard from '../components/LawyerCard';
import AdvancedSearch from '../components/AdvancedSearch';
import SuccessSection from '../components/SuccessSection';
import '../styles/Homepage.css';

const Homepage = () => {
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/lawyers');
      const data = await response.json();
      const lawyersArray = Array.isArray(data) ? data : (data.data || []);
      setLawyers(lawyersArray);
      setFilteredLawyers(lawyersArray);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      setLawyers([]);
      setFilteredLawyers([]);
    } finally {
      setLoading(false);
    }
  };

  const displayedLawyers = showAll ? filteredLawyers : filteredLawyers.slice(0, 6);

  return (
    <div className="homepage">
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-content">
          <h1>Find Your Perfect Legal Expert</h1>
          <p>Connect with experienced lawyers for all your legal needs</p>
        </div>
      </section>

      {/* Lawyers Section */}
      <section className="lawyers-section">
        <h2>Our Expert Lawyers</h2>
        <p>Browse and book appointments with our experienced legal professionals</p>

        {loading ? (
          <div className="loading">Loading lawyers...</div>
        ) : (
          <>
            <AdvancedSearch items={lawyers} onFilter={setFilteredLawyers} />
            
            <div className="lawyers-grid">
              {displayedLawyers.map(lawyer => (
                <LawyerCard key={lawyer._id} lawyer={lawyer} />
              ))}
            </div>

            {filteredLawyers.length > 6 && !showAll && (
              <button 
                className="show-all-btn" 
                onClick={() => setShowAll(true)}
              >
                Show All Lawyers ({filteredLawyers.length})
              </button>
            )}

            {showAll && filteredLawyers.length > 6 && (
              <button 
                className="show-less-btn"
                onClick={() => setShowAll(false)}
              >
                Show Less
              </button>
            )}
          </>
        )}
      </section>

      {/* Success Section */}
      <SuccessSection />
    </div>
  );
};

export default Homepage;
