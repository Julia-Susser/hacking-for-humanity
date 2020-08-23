const https = require('https');
const path = require('path');
var fs = require('fs');
module.exports = function(app, firebase, db){





var all = ''
app.get('/advocate-contact', function(req, res) {
  var user = firebase.auth().currentUser;

  if (user) {

  } else {
    // No user is signed in.
    res.redirect("/login")
  }
  var advocate_name = req.query.name
  res.sendfile('./public/advocate-contact/advocate-contact.html');

});

app.post('/advocate-sub', function(req, res) {
  var user = firebase.auth().currentUser;

  if (user) {

  } else {
    // No user is signed in.
    res.redirect("/login")
  }
  var advocate_name = req.query.advocate_name
  /*var docRef = db.collection("advocates").doc("advocates")

  docRef.get().then(function(doc) {
  if (doc.exists) {
      var data = doc.data()
      console.log(data);
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
  }).catch(function(error) {
  console.log("Error getting document:", error);
});*/
      if (advocate_name === "Julia S"){
        var advocate_email = "juliasusser@gmail.com"
      }else if (advocate_name === "Phil S"){
        var advocate_email = "rpsusser@yahoo.com"
      }else{
        var advocate_email = "susserfamily@gmail.com"
      }
      console.log(advocate_email)


      phone_num = req.body.number;
      bio = req.body.bio;

      var user = firebase.auth().currentUser;
      email = user.email;
      name = user.displayName
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'HackingForHumanity@gmail.com',
          pass: 'HackingForHumanity123'
        }
      });

      var mailOptions = {
        from: 'HackingForHumanity@gmail.com',
        to: advocate_email,
        subject: "Homeless Connection Reaching Out from " + name,
        text: `Hi ${advocate_name}, \n${name}'s phone number is ${phone_num}. Their email is ${email}. \nTheir bio is ${bio}.`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send(`Thank You For Sending A Message! ${advocate_name} will get back to you as soon as possible via email.`)
});
}
