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

    trailers = () => this.db.ref('trailers/')
    getOneTrailer = (id) => this.db.ref('trailers/' + id)
    postTrailers = (data) => this.db.ref('trailers/').push(data)

    getComments = (trailerId) => this.db.ref(`trailers/${trailerId}/comments/`)
    postComment = (data, trailerId) => this.db.ref(`trailers/${trailerId}/comments`).push(data)
    deleteComment = (trailerId, commentId) => this.db.ref(`trailers/${trailerId}/comments/${commentId}`).remove();


    postLike = (data, trailerId) => this.db.ref(`trailers/${trailerId}/likes`).push(data)
    getLikes = (trailerId) => this.db.ref(`trailers/${trailerId}/likes`)
    deleteLike = (trailerId, likeId) => this.db.ref(`trailers/${trailerId}/likes/${likeId}`).remove();

    getUserFavorites = (username) => this.db.ref(`favorites/${username}`);
    postFavorite = (trailerId, username) => this.db.ref(`favorites/${username}/`).push(trailerId);
    deleteFavorite = (username, favoriteId) => this.db.ref(`favorites/${username}/${favoriteId}`).remove();

    getFavorites = (username) => this.db.ref(`favorites/${username}`)
}

export default Firebase;