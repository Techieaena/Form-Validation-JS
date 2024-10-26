const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static('public'));

// Serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aenakhichi62108@gmail.com', // Replace with your email
        pass: 'eufczowxoirrpifn'           // Replace with your app password
    }
});

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    const { fname, femail, fphone, fcountry, fpassword } = req.body;

    try {
        // Email options
        let mailOptions = {
            from: 'aenakhichi62108@gmail.com', // Replace with your email
            to: 'project-handler-email@example.com', // Replace with the recipient's email
            subject: 'New Form Submission',
            text: `You have a new form submission from:
            Name: ${fname}
            Email: ${femail}
            Phone: ${fphone}
            Country: ${fcountry}
            Password: ${fpassword}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Redirect to thank you page after successful submission
        res.redirect('/thankyou.html');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('There was an error processing your request');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
