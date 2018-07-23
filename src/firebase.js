import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/datastore';
import React from "react";


const config = {
    apiKey: "AIzaSyBwJ1UIzxPr_R7nXLJpmEYcCEJVWxF8R1U",
    authDomain: "newtest-bfdda.firebaseapp.com",
    databaseURL: "https://newtest-bfdda.firebaseio.com",
    projectId: "newtest-bfdda",
    storageBucket: "newtest-bfdda.appspot.com",
    messagingSenderId: "867941884545"
};
export default firebase.initializeApp(config);