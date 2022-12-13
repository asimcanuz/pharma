// packages
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

//middlewares
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
// cors options
const corsOptions = require("./config/corsOptions");
// routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.router");
var authRouter = require("./routes/auth.router");
var refreshRouter = require("./routes/refresh.router");
var employeesRouter = require("./routes/employees.router");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(credentials);

// Cross Origin Resource sharing
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//models
var models = require("./models");
models.sequelize
  .sync()
  .then(() => {
    console.log("Nice! Db looks fine");
  })
  .catch((err) => console.log(err, "Something went wrong with Db update!"));

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/refresh", refreshRouter);

app.use(verifyJWT);
app.use("/users", usersRouter);
app.use("/employee", employeesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
