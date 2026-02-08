import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addBooking } from '../utils/localStorage';
import './BookingConfirmation.css';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const savedRef = useRef(false);

  const { movie, cinema, date, time } = location.state || {};

  useEffect(() => {
    if (savedRef.current || !user || !movie || !cinema || !date || !time) return;
    savedRef.current = true;
    addBooking({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      movieId: movie.id,
      movieTitle: movie.title,
      city: cinema.city,
      cinemaId: cinema.id,
      cinemaName: cinema.name,
      cinemaLocation: cinema.location,
      date,
      time,
    });
  }, [user, movie, cinema, date, time]);

  if (!movie || !cinema || !date || !time) {
    return (
      <div className="confirmation-page">
        <p>Booking details missing.</p>
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
    );
  }

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="confirmation-page">
      <header className="confirmation-header">
        <h1>Quick Booking</h1>
        <span className="user-badge">{user?.name || user?.email}</span>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h2>Your ticket has been successfully booked.</h2>
        <div className="booking-details">
          <p><strong>Movie:</strong> {movie.title}</p>
          <p><strong>City:</strong> {cinema.city}</p>
          <p><strong>Cinema Hall:</strong> {cinema.name}</p>
          <p><strong>Location:</strong> {cinema.location}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
        </div>
        <Link to="/dashboard" className="dashboard-link">Back to Dashboard</Link>
      </div>
    </div>
  );
}
