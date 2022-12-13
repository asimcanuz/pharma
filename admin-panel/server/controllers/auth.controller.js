const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRegister = async (req, res) => {
  try {
    // get all data from body
    const { firstname, lastname, username, email, password } = req.body;
    // bcrypt password
    const encryptpass = await bcrypt.hash(password, 10);
    // save the user
    await User.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: encryptpass,
    }).then((user) => {
      res.status(201).send(user);
    });

    // generate a token
  } catch (error) {
    res.status(error.code).send({
      message: error.message || "Something went wrong",
    });
  }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User Not found." });

      var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );
      var refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      user.update({ refreshToken: refreshToken });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const handleLogout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204); // no content
  const refreshToken = cookies.jwt;

  User.findOne({
    where: { refreshToken: refreshToken },
  }).then((foundUser) => {
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.status(204); // Forbidden
    }

    foundUser.update({ refreshToken: null });
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  });
};

module.exports = { handleLogin, handleRegister, handleLogout };
