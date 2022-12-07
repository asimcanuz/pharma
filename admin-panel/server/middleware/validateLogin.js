checkData = (req, res, next) => {
  const { username, password } = req.body;
  // check all the data
  if (!(username && password)) {
    return res.status(400).send({
      message: "All fields are compulsory",
    });
  }
  next();
};
const validateLogin = {
  checkData: checkData,
};

module.exports = validateLogin;
