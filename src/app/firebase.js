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

