const jwt = require('jsonwebtoken');
const Role = require('../models/roles');
const User = require('../models/User');
const jwt_secret = "This is @ secret stri@@ng";

const fetchUser = async (req, res, next) => {
    let success = false;
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({success, error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, jwt_secret);

        let user = await User.findById({ _id: data.user.id });
      
        if (user) {
           
            let success = false;
            for (let i = 0; i < user.roles.length; i++) {
                let role = await Role.findById({ _id: user.roles[i] });
                if (role && role.name === 'admin')
                    success = true;
            }
            if (!success)
                res.status(401).send({success, error: "Only Admin has the right to delete" });
            else {
                req.user = data.user;
                next();
            }

        }

    } catch (error) {
        res.status(401).send({ success, error: "Please authenticate using a valid token" });
    }

}
module.exports = fetchUser;