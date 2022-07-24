
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDoc, getFirestore, serverTimestamp } from "firebase/firestore";

import { useTodoStore } from "./store";

// const todo_store = useTodoStore();

const firebaseConfig = {
  apiKey: "AIzaSyBj1d6TnzFI5s2mQq8zIy2Kx1hAZIYmiOU",
  authDomain: "canismajoris.firebaseapp.com",
  projectId: "canismajoris",
  storageBucket: "canismajoris.appspot.com",
  messagingSenderId: "297512133065",
  appId: "1:297512133065:web:9ab8e88705091ab3ff4818",
  measurementId: "G-00VV0L0V3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase_db = getFirestore(app);

export const todos_collection = collection(firebase_db,"todos");
