import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import sendMail from '../middelwares/sendMail.js';

// const register = async (req, res) => {
//     try {
//         const { firstName, lastName, phoneNumber, emailAddress, password } = req.body;

//         // Check if the username is already taken
//         const existingUser = await User.findOne({ emailAddress });
//         if (existingUser) {
//             res.status(401).json({ message: 'EmailAddress already exists' });
//             return;
//         }
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({ firstName, lastName, phoneNumber, emailAddress, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.log('Signup error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

const register = async (req, res) => {
    try {
        // altCnctPersonBusEmail - Password Reset will go to this mail id for that keep values of loginId, altCnctPersonBusEmail same

        const logoCloudinaryUrl = req?.file?.path;
        const { role, loginId, password, companyName, companyWebsite, regOffAddrs, regOffCountry, regOffPhoneNo, cnctPerson, cnctPersonBusEmail, cnctPersonMob, altCnctPerson, altCnctPersonBusEmail, altCnctPersonMob, escCnctPerson, escCnctPersonBusEmail, escCnctPersonMob, subscriptionType, subscriptionStart, subscriptionEnd, paymentReceivedDate, paymentRemainderDate, logo } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ loginId });            // altCnctPersonBusEmail
        if (existingUser) {
            res.status(401).json({ message: 'LoginId already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user 
        const newUser = new User({ role, loginId, isVerified: false, password: hashedPassword, companyName, companyWebsite, regOffAddrs, regOffCountry, regOffPhoneNo, cnctPerson, cnctPersonBusEmail, cnctPersonMob, altCnctPerson, altCnctPersonBusEmail, altCnctPersonMob, escCnctPerson, escCnctPersonBusEmail, escCnctPersonMob, subscriptionType, subscriptionStart, subscriptionEnd, paymentReceivedDate, paymentRemainderDate, logo: logoCloudinaryUrl });
        await newUser.save();

        const verificationToken = jwt.sign({ userId: newUser?._id }, 'secret_key', { expiresIn: '1d' });        // change secret key

        const sendMailPayload = {
            receiver: loginId,            // altCnctPersonBusEmail
            subject: 'Email Verification',
            mailVerifiLink: `${process.env.BACKEND_LIVE}api/auth/verifyEmail/${verificationToken}`,
            templateName: 'register_email_verification_Template',
        };

        console.log("----- register sendMailPayload ----- ", sendMailPayload);
        await sendMail(sendMailPayload);

        // res.status(201).json({ message: 'User created successfully' });
        res.status(201).json({ message: 'Verification email sent.' });
    } catch (error) {
        console.log('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyRegister = async (req, res) => {
    const { token } = req.params;

    // Verifying the JWT token 
    jwt.verify(token, 'secret_key', async function (err, decoded) {
        if (err) {
            console.log("Register Email Verification error ", err);
            return res.render('register_email_verification_result_Template', { message: 'Email verification failed, possibly the link is invalid or expired' });
        }

        // Update user's verification status in the database
        try {
            const userId = decoded.userId;
            const user = await User.findById(userId);
            if (!user) {
                return res.render('register_email_verification_result_Template', { message: 'User not found' });
            }
            user.isVerified = true;
            await user.save();
            return res.render('register_email_verification_result_Template', { message: 'Email verified successfully' });
        } catch (error) {
            console.log("Error verifying email:", error);
            return res.render('register_email_verification_result_Template', { message: 'An error occurred during email verification' });
        }
    });
};

const login = async (req, res) => {
    try {
        const { emailAddress, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ loginId: emailAddress });
        if (!user) {
            res.status(401).json({ message: 'invalid Email' });
            return;
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'invalid Password' });
            return;
        }

        if (user && !user?.isVerified) {
            const verificationToken = jwt.sign({ userId: user?._id }, 'secret_key', { expiresIn: '1d' });        // change secret key

            const sendMailPayload = {
                receiver: user?.loginId,            // altCnctPersonBusEmail
                subject: 'Email Verification',
                mailVerifiLink: `${process.env.BACKEND_LIVE}api/auth/verifyEmail/${verificationToken}`,
                templateName: 'register_email_verification_Template',
            };

            console.log("----- login sendMailPayload ----- ", sendMailPayload);
            await sendMail(sendMailPayload);
            // return res.status(200).json({ success: true, message: 'Please check your email to verify your email address' });
            return res.status(200).json({ success: true, message: 'Verification email sent. Plz verify your email to login' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1d' });
        res.setHeader('Authorization', token);
        return res.status(200).json({ token: token, user, message: 'Login successfully' });
    } catch (error) {
        console.log("catch error ", error)
        res.status(500).json({ message: 'An error occurred' });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { loginId } = req.body;
        const user = await User.findOne({ loginId: loginId })    // altCnctPersonBusEmail

        if (user) {
            const resetPswdToken = jwt.sign({ userId: user?._id }, 'secret_key', { expiresIn: '5m' });        // change secret key

            user.resetPswdToken = resetPswdToken;
            await user.save();

            const sendMailPayload = {
                receiver: user?.loginId,                // altCnctPersonBusEmail
                subject: 'Reset Password | Sirat.earth',
                // resetPswdLink: `${process.env.FRONTEND_LIVE}/resetPassword?id=${user?._id}&token=${resetPswdToken}`,
                resetPswdLink: `http://localhost:3000/reset-password?id=${user?._id}&token=${resetPswdToken}`,                  // add env variable
                templateName: 'forgot_password_Template',
            };

            console.log("----- Forgot pswd sendMailPayload ----- ", sendMailPayload);
            await sendMail(sendMailPayload);

            return res.status(200).json({ message: 'Password reset email sent. Please check your email.' });

        } else {
            return res.status(400).json({ message: "Email Address is invalid" });
        }
    } catch (err) {
        console.log("---- forgotPassword catch err ", err);
        res.status(500).json({ message: 'An error occurred' });
    }
};

const resetForgotPassword = async (req, res) => {
    try {
        // const { newPassword, confirmPassword, token, userId } = req.body;
        const { newPassword, confirmPassword, token } = req.body;

        // Verify if the token is valid and find the user
        jwt.verify(token, 'secret_key', async function (err, decoded) {         // change secret key
            if (err) {
                console.log("Reset Password Token Verification Error:", err);
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            const userId = decoded.userId;

            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the provided token matches the user's resetPswdToken
            if (user.resetPswdToken !== token) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            // Check if newPassword and confirmPassword match
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update user's password and resetPswdToken
            user.password = hashedPassword;
            user.resetPswdToken = null;       // Clear reset token after password change
            await user.save();

            return res.status(200).json({ message: 'Password reset successful' });
        });

    } catch (error) {
        console.log("Reset Password Error:", error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

export default { register, verifyRegister, login, forgotPassword, resetForgotPassword };
