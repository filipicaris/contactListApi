var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

var Firebase = {
    firebaseURL: "https://nodejs1-5741f.firebaseio.com",
    ref: "restricted_access/contacts",

    getFirebaseRef() {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: this.firebaseURL
        });

        var ref = firebase.database().ref("restricted_access/first_document");
        ref.once("value", (snapshot) => {
            console.log(snapshot.val());
        });

        return ref;
    }
}

module.exports = Firebase;

