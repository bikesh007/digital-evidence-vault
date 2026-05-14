const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

    // GET TOKEN

    const token =
    req.header("x-auth-token");

    // CHECK TOKEN

    if (!token) {

        return res.status(401).json({

            msg: "No token, authorization denied"
        });
    }

    try {

        // VERIFY TOKEN

        const decoded =
        jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // ADD USER TO REQUEST

        req.user = decoded.user;

        next();

    } catch (error) {

        res.status(401).json({

            msg: "Token is not valid"
        });
    }
};