const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.'));

app.post('/book', async (req, res) => {
    const { name, email, date, time } = req.body;

    // Create a test account with Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Set up the transporter with Ethereal credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // Generated Ethereal user
            pass: testAccount.pass  // Generated Ethereal password
        }
    });

    const mailOptions = {
        from: '"Doctor Office" <no-reply@doctoroffice.com>',
        to: email,
        subject: 'Appointment Confirmation',
        text: `Hello ${name},\n\nYour appointment is confirmed for ${date} at ${time}.\n\nThank you!`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
        res.json({ message: 'Appointment booked! Check server logs for email preview.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});