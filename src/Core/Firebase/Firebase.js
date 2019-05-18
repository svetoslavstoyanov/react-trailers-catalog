import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { notify } from 'react-notify-toast';


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
        this.db = app.database();
        this.googleProvider = new app.auth.GoogleAuthProvider()
        this.facebookProvider = new app.auth.FacebookAuthProvider()
    }
    registerUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    loginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    loginUserWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    loginUserWithFaceBook = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    logoutUser = () => {
        this.auth.signOut()
        notify.show('Successful logout!', 'success');
    };

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        let dbUser = snapshot.val()

                        if (!dbUser.roles) {
                            dbUser.roles = {}
                        }

                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser
                        }
                        next(dbUser)
                    })
            } else {
                fallback()
            }
        })
}

export default Firebase;