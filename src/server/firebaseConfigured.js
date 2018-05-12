const Firebase = require('firebase')
// import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyA-_JcqEe2j_utPWr7Fz85PGSQPfAfHhvk',
  authDomain: 'recommender-system-266ac.firebaseapp.com',
  databaseURL: 'https://recommender-system-266ac.firebaseio.com',
  projectId: 'recommender-system-266ac',
  storageBucket: '',
  messagingSenderId: '370795417709'
}

const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.firestore()

db.settings({ timestampsInSnapshots: true })

module.exports = db

// export { auth, authProvider, db }
