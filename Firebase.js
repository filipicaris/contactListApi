var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

var Firebase = {
    firebaseURL: "https://nodejs1-5741f.firebaseio.com",
    ref: "restricted_access/contacts",

    initFirebaseRef() {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: this.firebaseURL
        });
    },

    getDatabase(){
        return firebase.database();
    }
}

module.exports = Firebase;

