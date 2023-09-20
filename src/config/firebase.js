import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

firebase.initializeApp({
  apiKey: "AIzaSyCxKkmDmfEPrLzkcEQHAGhncy2coiNIbo8",
  authDomain: "auction-a0879.firebaseapp.com",
  projectId: "auction-a0879",
  storageBucket: "auction-a0879.appspot.com",
  messagingSenderId: "474682173947",
  appId: "1:474682173947:web:0d6b5d78f192c8954f835e",
  measurementId: "G-N6SMPHM6W8",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();