const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = async (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, valid) => {
      if (err) {
        res.send(err)
      } else {
        next();
      }
    });
  }
};
module.exports = auth;
