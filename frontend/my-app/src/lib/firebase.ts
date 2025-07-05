import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCmXd3hOi0fVa1ga2rWx27xKmiqBDR9NJo",
  authDomain: "fileforge-24.firebaseapp.com",
  projectId: "fileforge-24",
  storageBucket: "fileforge-24.firebasestorage.app",
  messagingSenderId: "276497423105",
  appId: "1:276497423105:web:30b470ee642240b1b11900",
  measurementId: "G-9ZWS4J1RL8",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
