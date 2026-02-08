// Seed data for movies, cinema halls, and show times (no backend – used for initial LocalStorage)

export const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

function posterPlaceholder(title) {
  return `https://via.placeholder.com/200x300/1f2937/9ca3af?text=${encodeURIComponent(title)}`;
}

export const MOVIES = [
  {
    id: 'm1',
    title: 'The Dark Knight',
    poster: posterPlaceholder('The Dark Knight'),
    year: 2008,
    rating: 9.0,
    language: 'English',
    cities: ['Mumbai', 'Delhi', 'Bangalore'],
  },
  {
    id: 'm2',
    title: 'Inception',
    poster: posterPlaceholder('Inception'),
    year: 2010,
    rating: 8.8,
    language: 'English',
    cities: ['Mumbai', 'Delhi', 'Chennai', 'Kolkata'],
  },
  {
    id: 'm3',
    title: 'Dangal',
    poster: posterPlaceholder('Dangal'),
    year: 2016,
    rating: 8.5,
    language: 'Hindi',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
  },
  {
    id: 'm4',
    title: 'Interstellar',
    poster: posterPlaceholder('Interstellar'),
    year: 2014,
    rating: 8.7,
    language: 'English',
    cities: ['Mumbai', 'Bangalore', 'Kolkata'],
  },
  {
    id: 'm5',
    title: 'Baahubali 2',
    poster: posterPlaceholder('Baahubali 2'),
    year: 2017,
    rating: 8.2,
    language: 'Telugu',
    cities: ['Mumbai', 'Delhi', 'Chennai', 'Bangalore'],
  },
];

export const CINEMA_HALLS = [
  { id: 'c1', name: 'PVR Phoenix Mall', location: 'Lower Parel, Mumbai', city: 'Mumbai', movieIds: ['m1', 'm2', 'm3', 'm4'] },
  { id: 'c2', name: 'INOX R City', location: 'Ghatkopar, Mumbai', city: 'Mumbai', movieIds: ['m1', 'm2', 'm3'] },
  { id: 'c3', name: 'Cinepolis DLF', location: 'Saket, Delhi', city: 'Delhi', movieIds: ['m1', 'm2', 'm3', 'm5'] },
  { id: 'c4', name: 'PVR Anupam', location: 'Saket, Delhi', city: 'Delhi', movieIds: ['m2', 'm3', 'm5'] },
  { id: 'c5', name: 'Forum Mall Cinemas', location: 'Koramangala, Bangalore', city: 'Bangalore', movieIds: ['m1', 'm2', 'm3', 'm4', 'm5'] },
  { id: 'c6', name: 'PVR Orion Mall', location: 'Rajajinagar, Bangalore', city: 'Bangalore', movieIds: ['m2', 'm3', 'm5'] },
  { id: 'c7', name: 'Rohini Cinemas', location: 'T Nagar, Chennai', city: 'Chennai', movieIds: ['m2', 'm3', 'm5'] },
  { id: 'c8', name: 'INOX Bharath Mall', location: 'Park Street, Kolkata', city: 'Kolkata', movieIds: ['m2', 'm3', 'm4'] },
];

// Show slots: key = `${cinemaId}-${movieId}`, value = { [date]: [times] }
function buildShowSlots() {
  const slots = {};
  const timeSlots = ['10:00 AM', '02:00 PM', '06:00 PM', '09:30 PM'];
  CINEMA_HALLS.forEach((hall) => {
    hall.movieIds.forEach((movieId) => {
      const key = `${hall.id}-${movieId}`;
      slots[key] = {};
      for (let d = 0; d < 7; d++) {
        const date = new Date();
        date.setDate(date.getDate() + d);
        const dateStr = date.toISOString().slice(0, 10);
        slots[key][dateStr] = timeSlots.slice(0, 2 + (d % 2)); // 2 or 3 slots per day
      }
    });
  });
  return slots;
}

export const SHOW_SLOTS = buildShowSlots();

export const STORAGE_KEYS = {
  USERS: 'movie_booking_users',
  BOOKINGS: 'movie_booking_bookings',
  MOVIES: 'movie_booking_movies',
  CINEMA_HALLS: 'movie_booking_cinema_halls',
  SHOW_SLOTS: 'movie_booking_show_slots',
  CITIES: 'movie_booking_cities',
};
