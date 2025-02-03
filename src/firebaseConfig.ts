import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase yapılandırma bilgilerini buraya ekleyin
const firebaseConfig = {
  apiKey: "AIzaSyDM4AnU4I1rOl1Ps83r4ars--BBxHMab0o",
  authDomain: "interngo-6ea49.firebaseapp.com",
  projectId: "interngo-6ea49",
  storageBucket: "interngo-6ea49.firebasestorage.app",
  messagingSenderId: "592419751847",
  appId: "1:592419751847:web:8ca49f8ee90810bb4e1882",
  measurementId: "G-Y6XC4S4E6N"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth servisini dışa aktaralım
export const auth = getAuth(app);
