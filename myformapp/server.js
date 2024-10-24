const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

const app = express();
const port = 5000; // Set your desired port

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static('public'));

// Serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST route for form submission
app.post('/submit-form', (req, res) => {
    const { fname, femail, fphone, fcountry, fpassword } = req.body;

    // Setup Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-app-password'      // Replace with your app password
        }
    });

    // Email options
    let mailOptions = {
        from: femail,
        to: 'project-handler-email@example.com', // Project handler email
        subject: 'New Form Submission',
        text: `You have a new form submission from:
        Name: ${fname}
        Email: ${femail}
        Phone: ${fphone}
        Country: ${fcountry}
        Password: ${fpassword}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        } else {
            // Redirect to thankyou.html after successful form submission
            res.redirect('/thankyou.html');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
