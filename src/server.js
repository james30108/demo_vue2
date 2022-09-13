import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCtM-EXfexFWlgQG4chOr7gxEmrO0BUBoo",
  authDomain: "fir-bf367.firebaseapp.com",
  projectId: "fir-bf367",
  storageBucket: "fir-bf367.appspot.com",
  messagingSenderId: "502263055948",
  appId: "1:502263055948:web:3f6cab93786baf89c196e9",
  measurementId: "G-7Z4B97N8Y0"
}

// Initialize Firebase
const app     = initializeApp(firebaseConfig)
const db      = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }