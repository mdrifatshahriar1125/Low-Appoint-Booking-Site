import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/AdvancedSearch.css';

const AdvancedSearch = ({ items, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    experience: '',
    specialty: '',
    priceRange: [0, 5000]
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const specialties = useMemo(() => {
    return [...new Set(items.map(item => item.speciality || item.specialty))];
  }, [items]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    updateFilters();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    updateFilters();
  };

  const updateFilters = () => {
    const filtered = items.filter(item => {
      const matchesSearch = 
        (item.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.speciality?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.specialty?.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesExperience = !filters.experience || 
        (item.experience >= parseInt(filters.experience));

      const matchesSpecialty = !filters.specialty || 
        ((item.speciality || item.specialty) === filters.specialty);

      const matchesPrice = 
        (item.fee || 0) >= filters.priceRange[0] &&
        (item.fee || 0) <= filters.priceRange[1];

      return matchesSearch && matchesExperience && matchesSpecialty && matchesPrice;
    });

    onFilter(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({ experience: '', specialty: '', priceRange: [0, 5000] });
    onFilter(items);
  };

  return (
    <motion.div className="advanced-search" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="search-header">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, specialty..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <button 
          className={`filter-toggle ${showAdvanced ? 'active' : ''}`}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <FaFilter /> Advanced
        </button>
      </div>

      {showAdvanced && (
        <motion.div 
          className="advanced-filters"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div className="filter-group">
            <label>Minimum Experience (Years)</label>
            <input
              type="number"
              min="0"
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="filter-group">
            <label>Specialty</label>
            <select 
              value={filters.specialty}
              onChange={(e) => handleFilterChange('specialty', e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            />
          </div>

          <button className="reset-btn" onClick={resetFilters}>
            <FaTimes /> Clear Filters
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdvancedSearch;
