import {
  MOVIES,
  CINEMA_HALLS,
  CITIES,
  SHOW_SLOTS,
} from '../data/seedData';

const USERS_KEY = 'users';
const BOOKINGS_KEY = 'bookings';


export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ email, name, password }) {
  const users = getUsers();

  if (users.some((u) => u.email === email.toLowerCase())) {
    return { ok: false, error: 'Email already exists' };
  }

  const newUser = {
    id: `u${Date.now()}`,
    email: email.toLowerCase(),
    name,
    password,
  };

  users.push(newUser);
  setUsers(users);

  return { ok: true, user: newUser };
}

export function loginUser(email, password) {
  const users = getUsers();

  const user = users.find(
    (u) => u.email === email.toLowerCase() && u.password === password
  );

  if (!user) return { ok: false, error: 'Invalid credentials' };

  return { ok: true, user };
}


export function getBookings() {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
}

export function addBooking(booking) {
  const bookings = getBookings();
  bookings.push({ id: `b${Date.now()}`, ...booking });
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

// ---------- DATA ----------

export function getMovies() {
  return MOVIES;
}

export function getCinemaHalls() {
  return CINEMA_HALLS;
}

export function getCities() {
  return CITIES;
}

export function getShowSlots() {
  return SHOW_SLOTS;
}
