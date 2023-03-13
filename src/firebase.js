import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAy3QUHnausbrNsARfkUXkPZ5oJzcAXioo",
  authDomain: "notesapp-b1f77.firebaseapp.com",
  projectId: "notesapp-b1f77",
  storageBucket: "notesapp-b1f77.appspot.com",
  messagingSenderId: "647326301629",
  appId: "1:647326301629:web:fdb619e9a71a8679bfe6d4",
  measurementId: "G-TS5JX39X83"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default getFirestore(app);