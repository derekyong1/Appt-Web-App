const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

app.post('/book', (req, res) => {
    const { name, email, date, time } = req.body;

    // Set up email transporter (using Gmail for this example)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your Gmail
            pass: 'your-app-password'     // Replace with Gmail App Password (not regular password)
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Appointment Confirmation',
        text: `Hello ${name},\n\nYour appointment is confirmed for ${date} at ${time}.\n\nThank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.json({ message: 'Appointment booked! Check your email for confirmation.' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});