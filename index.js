require('dotenv').config();
const path = require('path');
const sgMail = require('@sendgrid/mail');
const express = require('express')
const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.route("/").get(function (req, res) {
    res.sendFile(path.join(__dirname, '/form.html'));
 });

 app.post('/contact', (req, res) => {
    console.log(req);
    const msg = {
        to: `${req.body.email}`, // Change to your recipient
        from: 'theprojectall@outlook.com', // Change to your verified sender
        subject: req.body.subject,
        text: `Message from ${req.body.email}:\n${req.body.message}`,
    }
    try {
      sgMail.send(msg);
      res.redirect('/?success=true');
  } catch (error) {
      res.redirect('/?success=false');
  }
});

app.listen(3000, () => { console.log(`Listening on port 3000`); });