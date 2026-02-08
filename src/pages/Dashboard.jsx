import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMovies, getCities } from '../utils/localStorage';
import './Dashboard.css';

export default function Dashboard() {
  const [cityFilter, setCityFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const movies = useMemo(() => getMovies(), []);
  const cities = useMemo(() => getCities(), []);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      const matchCity = !cityFilter || (m.cities && m.cities.includes(cityFilter));
      const matchName =
        !nameFilter ||
        m.title.toLowerCase().includes(nameFilter.trim().toLowerCase());
      return matchCity && matchName;
    });
  }, [movies, cityFilter, nameFilter]);

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <h1>Quick Booking</h1>
          <span className="user-badge">Hi, {user?.name || user?.email}</span>
        </div>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="filters">
        <div className="filter-group">
          <label>Filter by City</label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Movie Name</label>
          <input
            type="text"
            placeholder="Search movie..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </section>

      <h2 className="section-title">Available Movies</h2>
      <div className="movie-grid">
        {filtered.length === 0 ? (
          <p className="no-results">No movies match your filters.</p>
        ) : (
          filtered.map((movie) => (
            <Link
              key={movie.id}
              to={`/cinema-halls/${movie.id}`}
              state={{ movie }}
              className="movie-card"
            >
              <div className="movie-poster-wrap">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/200x300/1f2937/9ca3af?text=${encodeURIComponent(movie.title)}`;
                  }}
                />
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                  <span>{movie.year}</span>
                  <span>★ {movie.rating}</span>
                  <span>{movie.language}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
