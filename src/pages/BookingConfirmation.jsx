import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addBooking } from '../utils/localStorage';
import './BookingConfirmation.css';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const savedRef = useRef(false);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const { movie, cinema, date, time } = location.state || {};
  const ticketPrice = 500;

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

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError(null);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; 
      setIsProcessing(false);
      
      if (isSuccess) {
        setPaymentStatus('success');
      } else {
        setPaymentError('Payment failed. Please try again.');
        setPaymentStatus(null);
      }
    }, 2000);
  };

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
        {paymentStatus === 'success' ? (
          <>
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
            <div className="payment-success">
              <span className="success-badge">✓ Payment Successful</span>
              <p className="payment-confirmation">
                Your payment of ₹{ticketPrice} has been processed successfully.
              </p>
              <p className="booking-reference">
                Reference ID: #BK{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <Link to="/dashboard" className="dashboard-link">Back to Dashboard</Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="booking-title">Complete Your Booking</h2>
            <div className="booking-preview">
              <p><strong>Movie:</strong> {movie.title}</p>
              <p><strong>Cinema:</strong> {cinema.name}, {cinema.city}</p>
              <p><strong>Date & Time:</strong> {date} at {time}</p>
            </div>

            <form className="payment-form" onSubmit={handlePayment}>
              <div className="payment-section">
                <h3 className="payment-title">Select Payment Method</h3>
                
                {paymentError && (
                  <div className="payment-error">
                    <span className="error-icon">⚠</span>
                    {paymentError}
                  </div>
                )}

                <div className="amount-box">
                  <span className="amount-label">Amount to Pay:</span>
                  <span className="amount-value">₹{ticketPrice}</span>
                </div>

                <div className="payment-methods">
                  <label className="payment-method-option">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card" 
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="method-label">💳 Credit/Debit Card</span>
                  </label>

                  <label className="payment-method-option">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="upi" 
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="method-label">📱 UPI</span>
                  </label>

                  <label className="payment-method-option">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="wallet" 
                      checked={paymentMethod === 'wallet'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="method-label">👝 Digital Wallet</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={cardDetails.cardName}
                      onChange={handleCardInputChange}
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number (16 digits)"
                      maxLength="16"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      required
                      disabled={isProcessing}
                    />
                    <div className="card-row">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={cardDetails.expiry}
                        onChange={handleCardInputChange}
                        required
                        disabled={isProcessing}
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        maxLength="3"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="card-form">
                    <input
                      type="email"
                      placeholder="Enter UPI ID (e.g., name@upi)"
                      disabled={isProcessing}
                      required
                    />
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="card-form">
                    <select disabled={isProcessing} required>
                      <option value="">Select Wallet</option>
                      <option value="paytm">Paytm</option>
                      <option value="googlepay">Google Pay</option>
                      <option value="phonepe">PhonePe</option>
                    </select>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="payment-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${ticketPrice}`
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
