const User = require("../models").User;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.status(400);
  // console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  User.findOne({
    where: { refreshToken: refreshToken },
  }).then((foundUser) => {
    // console.log(foundUser);
    if (!foundUser) {
      return res.status(403); // Forbidden
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          {
            username: decoded.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.json({ accessToken });
      }
    );
  });
};
module.exports = { handleRefreshToken };
