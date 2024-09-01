const jwt = require('jsonwebtoken');

 const VerifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token){
         return res.status(401).json({
            status: 102,
            message: "Tidak Ada Token",
            data: null
         }); 
        }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { 
        if (err) {
            return res.status(401).json({
                status: 108,
                message: "Token Tidak Valid Atau Kadaluarsa",
                data: null
             }); 
            }
        req.email = decoded.email;
        next();
    });
};

module.exports = VerifyToken;
