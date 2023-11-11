import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAwU3wIGXRtI7NefVtYUTurHx0QX3nCbCQ",
  authDomain: "creditos-rapidos-87d64.firebaseapp.com",
  databaseURL: "https://creditos-rapidos-87d64-default-rtdb.firebaseio.com",
  projectId: "creditos-rapidos-87d64",
  storageBucket: "creditos-rapidos-87d64.appspot.com",
  messagingSenderId: "735648620387",
  appId: "1:735648620387:web:9b22a7118c7be6a9b53d56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };