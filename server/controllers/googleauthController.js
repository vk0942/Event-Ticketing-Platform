const googleUser = require('../models/googleuser');
const User = require('../models/user');

const googleUsers = async (req, res) => {
    const { email, name, picture } = req.body;

    const user = await googleUser.findOne({ email });
    
    var dateWithTime = new Date().toLocaleString().replace(",", "");

    if(!user){
        await googleUser.create({ email, name, picture, logs: [dateWithTime] });
    }
    else{
        user.name = name;
        user.picture = picture;
        user.logs.push(dateWithTime);

        await user.save();
    }
    
    res.status(201).json({ 
        message : 'Signed In Successfully' 
    });  
};

module.exports = { googleUsers };