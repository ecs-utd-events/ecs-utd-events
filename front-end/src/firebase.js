
import firebase from 'firebase/app';
import firestore from "firebase/firestore";
import 'firebase/auth';

const FIREBASE_CONFIG = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_CONFIG_MEASUREMENTID
};

firebase.initializeApp(FIREBASE_CONFIG);
export const auth = firebase.auth();