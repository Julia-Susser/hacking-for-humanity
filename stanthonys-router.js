const https = require('https');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
module.exports = function(app,firebase, db){
  var all = ''

    app.get('/st-anthonys', function(req, res) {
      var user = firebase.auth().currentUser;

      if (user) {

      } else {
        // No user is signed in.
        res.redirect("/login")
      }
      all = ''
      // If modifying these scopes, delete token.json.
      const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
      // The file token.json stores the user's access and refresh tokens, and is
      // created automatically when the authorization flow completes for the first
      // time.
      const TOKEN_PATH = 'token.json';

      // Load client secrets from a local file.
      fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content), listMajors);
      });

      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getNewToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          callback(oAuth2Client);
        });
      }

      /**
       * Get and store new token after prompting for user authorization, and then
       * execute the given callback with the authorized OAuth2 client.
       * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
       * @param {getEventsCallback} callback The callback for the authorized client.
       */
      function getNewToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
          });
        });
      }

      /**
       * Prints the names and majors of students in a sample spreadsheet:
       * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
       */
      function listMajors(auth) {
        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.get({
          spreadsheetId: '1ieZ9ylDwyc835cowT_hv5QhrmORCBMg3D5opJXPdTAM',
          range: 'A:E',
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const rows = res.data.values;
          if (rows.length) {

            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
              html = `<tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
              </tr>`
              all = all + html

            fs.writeFile('public/st_anthonys_info.txt', all, function (err) {
              if (err) throw err;
              });

            });
          } else {
            console.log('No data found.');
          }

        });
        all = ''
        res.sendFile(path.join(__dirname, '/public/st-anthonys/st-anthonys.html'));
      }




    });



    app.get('/st-anthonys-subscribe', function(req, res) {


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
        to: email,
        subject: "Subscribed to St Anthony's",
        text: `Hi ${name}, \nYou have Subscribed to new St Anthony's San Francisco Updates`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });




      var data = firebase.firestore().collection("subscribe").doc("st-anthonys")
      data.update({email:email})

});

}
