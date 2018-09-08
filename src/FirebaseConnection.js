import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD1fLpEWbmXja18DJsZv9bJsFpqOzgT3Lc",
    authDomain: "wattsappclone-1747d.firebaseapp.com",
    databaseURL: "https://wattsappclone-1747d.firebaseio.com",
    projectId: "wattsappclone-1747d",
    storageBucket: "wattsappclone-1747d.appspot.com",
    messagingSenderId: "312528232468"
  };
firebase.initializeApp(config);

export default firebase;