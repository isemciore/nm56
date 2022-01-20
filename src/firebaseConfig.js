// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getDownloadURL, getMetadata, getStorage, listAll, ref } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import { mapMutations } from 'vuex'
import store from './store'
const { initializeAppCheck, ReCaptchaV3Provider } = require('firebase/app-check')
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
self.FIREBASE_APPCHECK_DEBUG_TOKEN = false
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LfpXZodAAAAABaJCNr8eUlVcYJZXLCZaowOvpwQ'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
})

const analytics = getAnalytics(firebaseApp)
const storage = getStorage(firebaseApp, 'gs://nm56-521ce.appspot.com')
const db = getFirestore();
const auth = getAuth()
onAuthStateChanged(auth, user => {
  console.log('Auth changed')
  if (user != null) {
    console.log('Logged in')
    store.dispatch('DUMMY_LOGIN', user)
    logEvent(analytics, 'login website', { user: user.email })
    // store.commit('SET_USER_LOGIN_STATUS', true)
  } else {
    console.log('Logged out')
    store.dispatch('DUMMY_LOGIN', null)
    // store.commit('SET_USER_LOGIN_STATUS', false)
  }
})

function populateFileList (listRef) {
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        populateFileList(folderRef)
      })
      res.items.forEach((itemRef) => {
        getMetadata(itemRef).then((metaData) => {
          getDownloadURL(itemRef).then((dl) => {
            store.commit('ADD_PUBLIC_LINK', { downloadLink: dl, ...metaData })
          })
        })
      })
    }).catch((error) => {
    console.log(error)
  })
}

const listRef = ref(storage, 'public/nyttigt')
// populateFileList(listRef)

logEvent(analytics, 'enter website')
