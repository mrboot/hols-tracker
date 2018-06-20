import firebase from 'firebase/app';
import 'firebase/firestore';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } = publicRuntimeConfig

const config = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID
};

const db = !firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();

db.settings({
  timestampsInSnapshots: true
})

export default db;