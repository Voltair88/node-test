const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check if json web token exists and is verified
    if (token) {
        jwt.verify(token, "bulle", (error) => {
            if (error) {
                console.log(err.message);
                res.redirect("./login");
            } else {
                next();
            }
        });
    } else {
        res.redirect("../login");
    }
};

module.exports = {
    requireAuth,
};