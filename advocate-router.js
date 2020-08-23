const https = require('https');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
module.exports = function(app,firebase, db){
  var all = ''

    app.get('/advocate', function(req, res) {
      var user = firebase.auth().currentUser;

      if (user) {

      } else {
        // No user is signed in.
        res.redirect("/login")
      }
        res.sendFile(path.join(__dirname, '/public/advocate/advocate.html'));





    });






}
