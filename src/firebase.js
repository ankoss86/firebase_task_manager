import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBVqO6qew1j1v-GeobjH_mA55NAqxMo5do",
    authDomain: "dosomething-ee893.firebaseapp.com",
    databaseURL: "https://dosomething-ee893.firebaseio.com",
    projectId: "dosomething-ee893",
    storageBucket: "dosomething-ee893.appspot.com",
    messagingSenderId: "403748475722"
};

firebase.initializeApp(config);

export default firebase;