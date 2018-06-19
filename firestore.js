import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCylAy2OdgtrotBQwKn28fF6V4oG-UL848",
  authDomain: "holiday-tracker-dd69d.firebaseapp.com",
  databaseURL: "https://holiday-tracker-dd69d.firebaseio.com",
  projectId: "holiday-tracker-dd69d",
  storageBucket: "",
  messagingSenderId: "899981087645"
};

// firebase.initializeApp(config);

// export const db = firebase.firestore();

export default !firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();