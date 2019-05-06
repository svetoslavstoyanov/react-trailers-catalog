import app from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyB_50AcqYz_4xFJFpYnH1x5PM-9FJYgnQs",
    authDomain: "react-trailers-catalog.firebaseapp.com",
    databaseURL: "https://react-trailers-catalog.firebaseio.com",
    projectId: "react-trailers-catalog",
    storageBucket: "react-trailers-catalog.appspot.com",
    messagingSenderId: "438286852216",
    appId: "1:438286852216:web:330e365ad8bb851f"
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();

    }
    registerUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    loginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    logoutUser = () => this.auth.signOut();
}

export default Firebase;