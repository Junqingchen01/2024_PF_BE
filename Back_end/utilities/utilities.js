let jwt = require('jsonwebtoken');
let secretKey = "secret-key"; 
exports.generateToken = (user_info, callback) => {
    const { UserID, Name, UserType } = user_info; 

    let token = jwt.sign({
        UserID,
        Name,
        UserType, 
    }, secretKey, { expiresIn: '2h' });
    
    return callback(token);
}

exports.validateToken = (req, res, next) => {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const [bearer, token] = authorizationHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ error: "Invalid Authorization header format." });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token." });
        }

        req.UserID  = decoded.UserID;
        req.userName = decoded.Name;
        req.userType = decoded.UserType; 
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    const userType = req.userType;

    if (userType !== 'admin') {
        return res.status(403).json({ error: 'Access forbidden. Admin access required.' });
    }

    next();
};


