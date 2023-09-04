const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const user = require('../models/user');

let errors = {
    username : "",
    email : "",
    password : "",
};

const signup = async (req,res) => {

    const { fname, lname, username, email, password, dob } = req.body;

    const usernameAlreadyExists = await User.findOne({ username });
    const emailAlreadyExists = await User.findOne({ email });

    if(usernameAlreadyExists){
        errors.username = "Username Already Exists!";
        return res.status(401).json({ errors });
    }

    if(emailAlreadyExists){
        errors.email = "Email Already Exists!";
        return res.status(401).json({ errors });
    }

    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(password, salt);

    const user = new User({
        fname, lname, username, email, password : Password, dob,
    });

    const verificationToken = crypto.randomBytes(20).toString('hex');

    user.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    user.emailVerificationExpire = Date.now() + (24 * 60 * 60 * 1000);

    await user.save();

    const verificationUrl = `http://localhost:3000/${verificationToken}`;

    const message = `
        <h2> Thank You for registering with us! </h2>
        <p> Please click the below button to verify your email </p>
        <button> <a href=${verificationUrl} clicktracking=off> Verify Email </a> </button>
    `

    await sendEmail({
        from: 'userauthms@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: message
    });

    console.log('Email Sent');

    res.status(201).json({ 
        "message" : "Successfully Registered"
    });    
}

const emailVerification = async (req, res) => {

    const emailVerificationToken = crypto.createHash('sha256').update(req.params.verificationToken).digest('hex');

    const user = await User.findOne({
        emailVerificationToken,
        emailVerificationExpire: { $gt: Date.now() }
    });

    if(!user){
        errors.email = 'Invalid Verification Token';
        return res.status(404).json({ errors });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.status(201).json({
        "message" : "Email Verified Successfully"
    });

}

const signin = async (req, res) => {

    const { usernameOrEmail, password } = req.body;
    const usernameExists = await User.findOne({ username : usernameOrEmail });
    const emailExists = await User.findOne({ email : usernameOrEmail });

    if(!usernameExists && !emailExists){
        errors.username = "Username or Email not found!";
        return res.status(404).json({ errors });
    }
    let user;
    let hashPassword;
    if(usernameExists){
        user = usernameExists;
        if(!usernameExists.isVerified){
            errors.email = 'Please Verify your Email first';
            return res.status(401).json({ errors });
        }

        hashPassword = usernameExists.password;
    }
    if(emailExists){
        user = emailExists;
        if(!emailExists.isVerified){
            errors.email = 'Please Verify your Email first';
            return res.status(401).json({ errors });
        }

        hashPassword = emailExists.password;
    }

    const auth = await bcrypt.compare(password, hashPassword);
    if(!auth){
        errors.password = "Incorrect Password!";
        return res.status(401).json({ errors });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });

    res.status(201).json({ 
        "message" : "Signed In Successfully",
        token
    });
}

const forgotPassword = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        errors.email = 'Email not found';
        return res.status(404).json({ errors });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
    user.resetPasswordExpire = Date.now() + (10 * 60 * 1000);

    await user.save();

    const resetPasswordUrl = `http://localhost:3000/${resetPasswordToken}`;

    const message = `
        <h2> You requested a password reset </h2>
        <h2> Click on this button to reset your password </h2>
        <button> <a href=${resetPasswordUrl}> Reset Password </a> </button> 
    `;

    await sendEmail({
        from : "userauthms@gmail.com",
        to : email,
        subject : "Password Reset",
        html : message
    });
     
    res.status(201).json({
        "message" : "Email Sent"
    });

}

const resetPassword = async (req, res) => {
    
    const { password } = req.body;

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user){
        errors.password = 'Invalid Token';
        return res.status(401).json({ errors });
    }

    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(password, salt);

    user.password = Password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
        "message" : "Password Updated Successfully"
    });

}

const deleteAccount = async (req,res) => {

    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(201).json({
        "message" : "Account Deleted Successfully"
    });
} 

module.exports = {
    signup,
    emailVerification,
    signin,
    forgotPassword,
    resetPassword,
    deleteAccount
}