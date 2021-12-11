// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDjEsSPN9hu18YVIfUSZ0AW8mx-Wj0-u2k',
  authDomain: 'nm56-521ce.firebaseapp.com',
  projectId: 'nm56-521ce',
  storageBucket: 'nm56-521ce.appspot.com',
  messagingSenderId: '331449712811',
  appId: '1:331449712811:web:5b59b10c09fa3ca338b7ee',
  // eslint-disable-next-line no-template-curly-in-string
  measurementId: 'G-48J42W501Z',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)

const auth = getAuth(firebaseApp)

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('Logged in')
  } else {
    console.log('Logged out')
  }
})
