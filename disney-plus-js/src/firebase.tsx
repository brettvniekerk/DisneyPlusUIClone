// Import the functions you need from the SDKs you need -- https://firebase.google.com/docs/web/learn-more?authuser=0&hl=en#modular-version
import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY, // react environment variables require REACT_APP_ prefix for var name to work
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()

export { auth, storage, provider }
export default db