const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userService = require('../services/userService');

const signup = async (req, res, next) => {
    console.log('signupController.js', req.body);
    try {
        const { name, email, password, role } = req.body;
        console.log(req.body);
        const user = await userService.createUser(name, email, password, role);
        // Generate a verification token
        const token = crypto.randomBytes(20).toString('hex');
        // Store the token in the database associated with the user
        user.emailVerificationToken = token;
        await user.save();
        // Send verification email
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "eb5ed7fee7fdb4",
                pass: "36872b6556a345"
            }
        });
        const mailOptions = {
            from: '"Home Automation System" <no-reply@has.com>',
            to: user.email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking on the following link: https://bitebuddy-nydw.onrender.com/api/v1/verify-email?token=${token}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ccc;">
                    <h2 style="color: #333; text-align: center;">Welcome to Your Company Name!</h2>
                    <p style="font-size: 16px; line-height: 1.6;">
                        Thank you for signing up with us. Please verify your email address to complete your registration.
                    </p>
                    <a href="https://bitebuddy-nydw.onrender.com/api/v1/verify-email?token=${token}" 
                        style="display: block; background-color: #4CAF50; color: #fff; text-align: center; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                        Verify Email
                    </a>
                    <p style="font-size: 14px; color: #555;">
                        If the button above doesn't work, please copy and paste the following link into your browser:
                        <br>
                        <a href="https://bitebuddy-nydw.onrender.com/api/v1/verify-email?token=${token}" style="color: #3498db;">https://bitebuddy-nydw.onrender.com/api/v1/verify-email?token=${token}</a>
                    </p>
                    <p style="font-size: 14px; color: #555; text-align: center;">
                        Best Regards, <br>
                        Home Automation System Team
                    </p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        return res.status(201).json({ user });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    signup
}
