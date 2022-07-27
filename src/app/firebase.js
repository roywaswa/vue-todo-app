import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  getFirestore,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  updateDoc,
  doc
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase_db = getFirestore(app);

export const todos_collection = collection(firebase_db, "todos");
export const todos_query = query(todos_collection,orderBy("createdAt", "asc"));



export async function addTodoToFirestore(todo) {
  try {
    const doc = await addDoc(todos_collection, {
      ...todo,
      createdAt: serverTimestamp()
    })
    return doc.id
  } catch (error) {
    console.log(error);
  }
}

export async function updateTodoInFirestore(todo) {
  try {
    await updateDoc(doc(firebase_db, "todos", todo.id), {
      ...todo,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodoInFirestore(todo) {
  try {
    await deleteDoc(doc(firebase_db, "todos", todo.id))
  } catch (error) {
    console.log(error);
  }
}

