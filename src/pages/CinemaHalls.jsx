import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCinemaHalls, getMovies } from '../utils/localStorage';
import './CinemaHalls.css';

export default function CinemaHalls() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const movie = location.state?.movie ?? getMovies().find((m) => m.id === movieId);
  const allHalls = getCinemaHalls();
  const halls = movie
    ? allHalls.filter((h) => h.movieIds && h.movieIds.includes(movie.id))
    : [];

  if (!movie) {
    return (
      <div className="cinema-page">
        <p>Movie not found.</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    );
  }

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="cinema-page">
      <header className="cinema-header">
        <div className="cinema-header-left">
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
          <h1>Cinema Halls</h1>
          <p className="movie-context">{movie.title}</p>
        </div>
        <span className="user-badge">{user?.name || user?.email}</span>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="halls-grid">
        {halls.length === 0 ? (
          <p className="no-results">No cinema halls available for this movie.</p>
        ) : (
          halls.map((hall) => (
            <Link
              key={hall.id}
              to={`/show-times/${movie.id}/${hall.id}`}
              state={{ movie, cinema: hall }}
              className="hall-card"
            >
              <div className="hall-icon">🎬</div>
              <h3>{hall.name}</h3>
              <p className="hall-location">{hall.location}</p>
              <span className="hall-city">{hall.city}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
