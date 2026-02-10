import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMovies, getCities } from '../utils/localStorage';
import './Dashboard.css';

export default function Dashboard() {
  const [cityFilter, setCityFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome back! Your saved bookings are ready.', type: 'info', time: 'Just now' },
    { id: 2, message: 'Special offer: Get 20% off on evening shows!', type: 'offer', time: '2 hours ago' },
    { id: 3, message: 'New movies released in your city this week.', type: 'update', time: '5 hours ago' }
  ]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const movies = useMemo(() => getMovies(), []);
  const cities = useMemo(() => getCities(), []);
  const FALLBACK_POSTER = '/assets/no-image.jpg';

  const unreadCount = notifications.length;

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

  function handleNotificationClick(id) {
    setNotifications(notifications.filter(n => n.id !== id));
  }

  function handleClearAll() {
    setNotifications([]);
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <h1>Quick Booking</h1>
          <span className="user-badge">Hi, {user?.name || user?.email}</span>
        </div>
        
        <div className="header-actions">
          <div className="notification-container">
            <button 
              className="notification-bell" 
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              🔔
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
            
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  {unreadCount > 0 && <button className="clear-btn" onClick={handleClearAll}>Clear All</button>}
                </div>
                
                {notifications.length > 0 ? (
                  <ul className="notification-list">
                    {notifications.map(notif => (
                      <li key={notif.id} className={`notification-item ${notif.type}`}>
                        <div className="notification-content">
                          <p className="notification-message">{notif.message}</p>
                          <span className="notification-time">{notif.time}</span>
                        </div>
                        <button 
                          className="remove-notif-btn" 
                          onClick={() => handleNotificationClick(notif.id)}
                          title="Dismiss"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-notifications">
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button type="button" className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
                    e.target.src = movie.poster || FALLBACK_POSTER;
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
