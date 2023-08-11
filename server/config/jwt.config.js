require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports.authenticate = (req, res, next) => {return(
jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
})
)
}