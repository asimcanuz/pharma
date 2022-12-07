const User = require("../models").User;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { username, email } = req.body;

  // Username
  User.findOne({
    where: {
      username: username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    });
  });
};
checkData = (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;

  // check all the data
  if (!(firstname && lastname && username && email && password)) {
    return res.status(400).send({
      message: "All fields are compulsory",
    });
  }
  next();
};
const validateRegister = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkData: checkData,
};

module.exports = validateRegister;
