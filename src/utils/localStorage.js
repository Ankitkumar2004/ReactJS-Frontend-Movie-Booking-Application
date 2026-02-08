import {
  MOVIES,
  CINEMA_HALLS,
  SHOW_SLOTS,
  CITIES,
  STORAGE_KEYS,
} from '../data/seedData';

export function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  return raw ? JSON.parse(raw) : [];
}

export function setUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function registerUser({ email, name, password }) {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: 'Email already registered' };
  }
  const user = {
    id: `u${Date.now()}`,
    email: email.trim().toLowerCase(),
    name: (name || '').trim(),
    password, // In a real app you would hash this
  };
  users.push(user);
  setUsers(users);
  return { ok: true, user: { id: user.id, email: user.email, name: user.name } };
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );
  if (!user) return { ok: false, error: 'Invalid email or password' };
  return {
    ok: true,
    user: { id: user.id, email: user.email, name: user.name },
  };
}

export function getBookings() {
  const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return raw ? JSON.parse(raw) : [];
}

export function addBooking(booking) {
  const bookings = getBookings();
  const newBooking = {
    id: `b${Date.now()}`,
    ...booking,
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return newBooking;
}

function ensureSeed() {
  if (!localStorage.getItem(STORAGE_KEYS.MOVIES)) {
    localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(MOVIES));
    localStorage.setItem(STORAGE_KEYS.CINEMA_HALLS, JSON.stringify(CINEMA_HALLS));
    localStorage.setItem(STORAGE_KEYS.SHOW_SLOTS, JSON.stringify(SHOW_SLOTS));
    localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(CITIES));
  }
}

export function getMovies() {
  ensureSeed();
  const raw = localStorage.getItem(STORAGE_KEYS.MOVIES);
  return raw ? JSON.parse(raw) : MOVIES;
}

export function getCinemaHalls() {
  ensureSeed();
  const raw = localStorage.getItem(STORAGE_KEYS.CINEMA_HALLS);
  return raw ? JSON.parse(raw) : CINEMA_HALLS;
}

export function getShowSlots() {
  ensureSeed();
  const raw = localStorage.getItem(STORAGE_KEYS.SHOW_SLOTS);
  return raw ? JSON.parse(raw) : SHOW_SLOTS;
}

export function getCities() {
  ensureSeed();
  const raw = localStorage.getItem(STORAGE_KEYS.CITIES);
  return raw ? JSON.parse(raw) : CITIES;
}
