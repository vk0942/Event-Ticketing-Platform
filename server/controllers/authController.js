const User = require('../models/user');
const bcrypt = require('bcrypt');

let errors = {
    username : "",
    email : "",
    password : "",
};

const signup = async (req,res) => {
    const {fname, lname, username, email, password, dob} = req.body;

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
        fname, lname, username, email, password : Password, dob
    });

    await user.save();

    res.status(201).json({ 
        "message" : "Successfully Registered"
    });    
}

const signin = async (req,res) => {

    const { usernameOrEmail, password } = req.body;
    const usernameExists = await User.findOne({ username : usernameOrEmail });
    const emailExists = await User.findOne({ email : usernameOrEmail });

    if(!usernameExists && !emailExists){
        errors.username = "Username or Email not found!";
        return res.status(404).json({ errors });
    }

    let hashPassword;
    if(usernameExists){
       hashPassword = usernameExists.password;
    }
    if(emailExists){
       hashPassword = emailExists.password;
    }

    const auth = await bcrypt.compare(password, hashPassword);
    if(!auth){
        errors.password = "Incorrect Password!";
        return res.status(401).json({ errors });
    }

    res.status(201).json({ 
        "message" : "Signed In Successfully"
    });
}

const forgotPassword = async (req, res) => {
    const { usernameOrEmail } = req.body;
    const user = 
    // sendEmail(usernameorEmail);
}

const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { id } = req.params;

    // find user from the url
    let user = User.findOne({ id });
    user.password = password;
}

module.exports = {
    signup,
    signin,
    forgotPassword,
    resetPassword,
}