const User = require('../models/Users');

const verifyEmail = async (req, res, next) => {
    try {
        const token = req.query.token;
        
        // Find the user associated with the token
        const user = await User.findOne({ emailVerificationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        
        // Mark the user's email as verified and remove the token
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        await user.save();

        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        return next(err);
    }
}

module.exports = { verifyEmail }
