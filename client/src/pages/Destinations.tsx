import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { apiService } from '../services/apiService';
import type { Destination } from '../types';
import '../styles/destinations.css';

const ITEMS_PER_PAGE = 6;

const Destinations: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchFromUrl = queryParams.get('search') || '';

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await apiService.getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  useEffect(() => {
    setSearchQuery(searchFromUrl);
    setCurrentPage(1);
  }, [searchFromUrl]);

  const categories = ['All', 'Beach', 'Adventure', 'Cultural', 'City', 'Nature'];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           dest.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesPrice = dest.price <= priceRange;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [destinations, searchQuery, selectedCategory, priceRange]);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const currentDestinations = filteredDestinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(500);
    setCurrentPage(1);
    navigate('/destinations');
  };

  return (
    <div className="destinations-page container" data-test="destinations-page">
      <div className="destinations-header">
        <h1 className="section-title">Explore All Destinations</h1>
        <p className="section-subtitle">{filteredDestinations.length} destinations found</p>
      </div>

      <div className="destinations-layout">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${isFilterOpen ? 'open' : ''}`} data-test="filters-sidebar">
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-filters" onClick={() => setIsFilterOpen(false)}><X /></button>
          </div>

          <div className="filter-group">
            <label className="filter-label">Search</label>
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search destinations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-test="dest-search-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="category-list">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                  data-test={`category-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label-row">
              <label className="filter-label">Max Price</label>
              <span className="price-display">${priceRange}</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="500" 
              step="10"
              value={priceRange}
              onChange={(e) => { setPriceRange(parseInt(e.target.value)); setCurrentPage(1); }}
              className="price-slider"
              data-test="price-range-slider"
            />
          </div>

          <button 
            className="btn btn-outline btn-block" 
            onClick={clearFilters}
            data-test="clear-filters-btn"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Results Grid */}
        <main className="results-container">
          <div className="mobile-filter-bar">
            <button 
              className="btn btn-outline mobile-filter-btn" 
              onClick={() => setIsFilterOpen(true)}
              data-test="mobile-filter-btn"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>

          {currentDestinations.length > 0 ? (
            <>
              <div className="destination-grid">
                {currentDestinations.map((dest) => (
                  <div key={dest.id} className="destination-card card" data-test={`dest-card-${dest.id}`}>
                    <div className="card-image-wrapper">
                      <img src={dest.imageUrl} alt={dest.name} className="card-image" />
                      <div className="card-badge">{dest.category}</div>
                    </div>
                    <div className="card-content">
                      <div className="card-header">
                        <h3 className="card-title">{dest.name}</h3>
                        <div className="card-rating">
                          <Star size={14} className="star-icon" fill="currentColor" />
                          <span>{dest.rating}</span>
                        </div>
                      </div>
                      <div className="card-location">
                        <MapPin size={14} />
                        <span>{dest.location}</span>
                      </div>
                      <div className="card-footer">
                        <div className="card-price">
                          <span className="price-value">${dest.price}</span>
                          <span className="price-unit">/ night</span>
                        </div>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/destinations/${dest.id}`)}
                          data-test={`view-details-${dest.id}`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination" data-test="pagination">
                  <button 
                    className="pagination-btn" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    data-test="prev-page-btn"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i + 1}
                      className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(i + 1)}
                      data-test={`page-btn-${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button 
                    className="pagination-btn" 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    data-test="next-page-btn"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results" data-test="no-results">
              <Search size={48} className="no-results-icon" />
              <h3>No destinations found</h3>
              <p>Try adjusting your filters or search query.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear all filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Destinations;
