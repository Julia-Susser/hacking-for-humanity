const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const admin = require('firebase-admin');
var firebase = require('firebase');
const fs = require('fs');
const serviceAccount = require('./serviceAccountKey.json');
const https = require('https');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
const url = require('url');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var firebaseConfig = {
  apiKey: "AIzaSyBc0_WGbeLBNd2NWCbiRjg1niVLR3XbGvM",
    authDomain: "hacking-for-humanity.firebaseapp.com",
    databaseURL: "https://hacking-for-humanity.firebaseio.com",
    projectId: "hacking-for-humanity",
    storageBucket: "hacking-for-humanity.appspot.com",
    messagingSenderId: "94263431979",
    appId: "1:94263431979:web:b00e0a6efe29ccc5e1ab6e",
    measurementId: "G-VYR8DSEJX0"
};

firebase.initializeApp(firebaseConfig);

app.use(express.static(path.join(__dirname, '/public')));
app.listen(port, () => console.log(`listening on port ${port}!`));

var db = firebase.firestore();
var data = ''

app.get('/logout', function(req, res) {
  firebase.auth().signOut().then(function() {
  res.redirect("/login")
}).catch(function(error) {
  // An error happened.
});




});


require('./stanthonys-router.js')(app,firebase, db);
require('./advocate-router.js')(app,firebase, db);
require('./contactus-router.js')(app,firebase, db);
require('./pitstop-router.js')(app,firebase, db);
require('./login-router.js')(app,firebase);
require('./signup-router.js')(app,firebase);
require('./home-router.js')(app,firebase);
