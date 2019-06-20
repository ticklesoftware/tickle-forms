import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD-HFOyGcluxDx7nJch_5U82GBPccd-euw",
  authDomain: "tickle-forms.firebaseapp.com",
  databaseURL: "https://tickle-forms.firebaseio.com",
  projectId: "tickle-forms",
  storageBucket: "tickle-forms.appspot.com",
  messagingSenderId: "898713454193",
  appId: "1:898713454193:web:21bf2f0b7cb498ef"
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export default firebase;
