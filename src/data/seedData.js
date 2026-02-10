import knight from '../assets/Knight.jpeg';
import inception from '../assets/Inception.jpg';
import dangal from '../assets/Dangal.jpeg';
import interstellar from '../assets/Interstellar.webp';
import baahubali from '../assets/Baahubali.jpeg';

import avatar from '../assets/avatar.jpeg';
import titanic from '../assets/titanic.jpeg';
import joker from '../assets/joker.jpeg';
import avengers from '../assets/avengers.jpeg';
import parasite from '../assets/parasite.jpeg';
import kgf from '../assets/kgf.jpeg';
import rrr from '../assets/rrr.jpeg';
import shawshank from '../assets/shawshank.jpeg';
import forrest from '../assets/forrest.jpeg';

export const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

export const MOVIES = [
  {
    id: 'm1',
    title: 'The Dark Knight',
    poster: knight,
    year: 2008,
    rating: 9,
    language: 'English',
    cities: ['Mumbai', 'Delhi', 'Bangalore'],
  },
  {
    id: 'm2',
    title: 'Inception',
    poster: inception,
    year: 2010,
    rating: 8.8,
    language: 'English',
    cities: ['Mumbai', 'Delhi', 'Chennai', 'Kolkata'],
  },
  {
    id: 'm3',
    title: 'Dangal',
    poster: dangal,
    year: 2016,
    rating: 8.5,
    language: 'Hindi',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
  },
  {
    id: 'm4',
    title: 'Interstellar',
    poster: interstellar,
    year: 2014,
    rating: 8.7,
    language: 'English',
    cities: ['Mumbai', 'Bangalore', 'Kolkata'],
  },
  {
    id: 'm5',
    title: 'Baahubali 2',
    poster: baahubali,
    year: 2017,
    rating: 8.2,
    language: 'Telugu',
    cities: ['Mumbai', 'Delhi', 'Chennai', 'Bangalore'],
  },


  {
    id: 'm6',
    title: 'Avatar',
    poster: avatar,
    year: 2009,
    rating: 7.8,
    language: 'English',
    cities: CITIES,
  },
  {
    id: 'm7',
    title: 'Titanic',
    poster: titanic,
    year: 1997,
    rating: 7.9,
    language: 'English',
    cities: CITIES,
  },
  {
    id: 'm8',
    title: 'Joker',
    poster: joker,
    year: 2019,
    rating: 8.4,
    language: 'English',
    cities: CITIES,
  },
  {
    id: 'm9',
    title: 'Avengers Endgame',
    poster: avengers,
    year: 2019,
    rating: 8.4,
    language: 'English',
    cities: CITIES,
  },
  {
    id: 'm10',
    title: 'Parasite',
    poster: parasite,
    year: 2019,
    rating: 8.6,
    language: 'Korean',
    cities: CITIES,
  },
  {
    id: 'm11',
    title: 'KGF Chapter 2',
    poster: kgf,
    year: 2022,
    rating: 8.3,
    language: 'Kannada',
    cities: CITIES,
  },
  {
    id: 'm12',
    title: 'RRR',
    poster: rrr,
    year: 2022,
    rating: 8,
    language: 'Telugu',
    cities: CITIES,
  },
  {
    id: 'm14',
    title: 'Shawshank Redemption',
    poster: shawshank,
    year: 1994,
    rating: 9.3,
    language: 'English',
    cities: CITIES,
  },
  {
    id: 'm15',
    title: 'Forrest Gump',
    poster: forrest,
    year: 1994,
    rating: 8.8,
    language: 'English',
    cities: CITIES,
  },
];

export const CINEMA_HALLS = [
 
  { id: 'c1', name: 'PVR Phoenix Mall', city: 'Mumbai', movieIds: ['m1','m2','m3','m4','m6','m7','m8','m9','m10','m11','m12','m14','m15'] },
  { id: 'c2', name: 'INOX R City', city: 'Mumbai', movieIds: ['m1','m2','m3','m5','m6','m7','m8','m9','m10','m11','m12','m14','m15'] },

  
  { id: 'c3', name: 'Cinepolis DLF', city: 'Delhi', movieIds: ['m1','m2','m3','m5','m6','m7','m8','m9','m10','m11','m12','m14','m15'] },
  { id: 'c4', name: 'PVR Anupam', city: 'Delhi', movieIds: ['m2','m3','m5','m6','m7','m8','m9','m10','m11','m12','m14','m15'] },

 
  { id: 'c5', name: 'Forum Mall Cinemas', city: 'Bangalore', movieIds: ['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12','m14','m15'] },
  { id: 'c6', name: 'PVR Orion Mall', city: 'Bangalore', movieIds: ['m2','m3','m5','m6','m7','m8','m9','m10','m11','m12','m14','m15'] },

  { id: 'c7', name: 'Rohini Cinemas', city: 'Chennai', movieIds: ['m2','m3','m5','m6','m7','m8','m9','m10','m11','m12','m14','m15'] },

  
  { id: 'c8', name: 'INOX Bharath Mall', city: 'Kolkata', movieIds: ['m2','m3','m4','m6','m7','m8','m9','m10','m11','m12','m14','m15'] },
];

export const STORAGE_KEYS = {
  USERS: 'users',
};



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

        // All 4 time slots every day
        slots[key][dateStr] = [...timeSlots];
      }
    });
  });

  return slots;
}

export const SHOW_SLOTS = buildShowSlots();
