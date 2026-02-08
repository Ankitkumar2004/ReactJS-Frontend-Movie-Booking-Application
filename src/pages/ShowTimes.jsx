import { useState, useMemo } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getShowSlots, getMovies, getCinemaHalls } from '../utils/localStorage';
import './ShowTimes.css';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function ShowTimes() {
  const { movieId, cinemaId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const movie = location.state?.movie ?? getMovies().find((m) => m.id === movieId);
  const cinema = location.state?.cinema ?? getCinemaHalls().find((c) => c.id === cinemaId);
  const showSlots = getShowSlots();

  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [selectedTime, setSelectedTime] = useState(null);

  const slotKey = cinema && movie ? `${cinema.id}-${movie.id}` : null;
  const dateSlots = slotKey && showSlots[slotKey] ? showSlots[slotKey][selectedDate] || [] : [];

  const availableDates = useMemo(() => {
    if (!slotKey || !showSlots[slotKey]) return [];
    return Object.keys(showSlots[slotKey]).sort();
  }, [slotKey, showSlots]);

  if (!movie || !cinema) {
    return (
      <div className="showtimes-page">
        <p>Movie or cinema not found.</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    );
  }

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  function handleDateChange(e) {
    setSelectedDate(e.target.value);
    setSelectedTime(null);
  }

  function handleConfirm() {
    if (!selectedTime) return;
    navigate('/booking-confirmation', {
      replace: true,
      state: {
        movie,
        cinema,
        date: selectedDate,
        time: selectedTime,
      },
    });
  }

  return (
    <div className="showtimes-page">
      <header className="showtimes-header">
        <div className="showtimes-header-left">
          <Link to={`/cinema-halls/${movie.id}`} state={{ movie }} className="back-link">
            ← Cinema Halls
          </Link>
          <h1>Show Date & Time</h1>
          <p className="movie-context">{movie.title} · {cinema.name}</p>
        </div>
        <span className="user-badge">{user?.name || user?.email}</span>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="showtimes-content">
        <section className="date-section">
          <label>Select Date (current date selected by default)</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={availableDates[0] || todayStr()}
            max={availableDates[availableDates.length - 1] || selectedDate}
          />
        </section>

        <section className="times-section">
          <h3>Available show timings</h3>
          {dateSlots.length === 0 ? (
            <p className="no-slots">No shows on this date.</p>
          ) : (
            <div className="time-grid">
              {dateSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </section>

        {selectedTime && (
          <div className="confirm-row">
            <button type="button" className="confirm-btn" onClick={handleConfirm}>
              Confirm & Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
