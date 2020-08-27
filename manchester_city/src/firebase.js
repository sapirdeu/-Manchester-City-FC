import firebase from "firebase";
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCbUCRJiHzuoFri1jjLtJwXM-p6qUt9UKY",
    authDomain: "m-city-a0f2c.firebaseapp.com",
    databaseURL: "https://m-city-a0f2c.firebaseio.com",
    projectId: "m-city-a0f2c",
    storageBucket: "m-city-a0f2c.appspot.com",
    messagingSenderId: "115994798059",
    appId: "1:115994798059:web:5f565f4ffcd678c301dbae",
    measurementId: "G-3KJEDSS4LP"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');


export {firebase, firebaseDB, firebaseMatches, firebasePromotions, firebaseTeams, firebasePlayers };
